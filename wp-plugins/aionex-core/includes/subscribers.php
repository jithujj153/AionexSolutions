<?php

if (!defined('ABSPATH')) {
    exit;
}

function aionex_create_subscriber($email, $filters = []) {
    $existing = get_posts([
        'post_type' => 'job_subscriber',
        'post_status' => 'publish',
        'posts_per_page' => 1,
        'meta_key' => 'email',
        'meta_value' => $email,
        'fields' => 'ids',
    ]);

    $confirm = wp_generate_password(32, false);
    $unsub = wp_generate_password(32, false);

    if (!empty($existing)) {
        $id = (int) $existing[0];
    } else {
        $id = wp_insert_post([
            'post_type' => 'job_subscriber',
            'post_status' => 'publish',
            'post_title' => $email,
        ]);
    }

    if (is_wp_error($id) || !$id) {
        return new WP_Error('subscriber_failed', 'Unable to create subscriber', ['status' => 500]);
    }

    update_post_meta($id, 'email', $email);
    update_post_meta($id, 'filters', wp_json_encode($filters));
    update_post_meta($id, 'confirm_token', $confirm);
    update_post_meta($id, 'unsubscribe_token', $unsub);
    update_post_meta($id, 'confirmed_at', '');
    update_post_meta($id, 'active', 1);

    $site = rtrim(get_option('aionex_public_site_url', home_url()), '/');
    $confirm_url = add_query_arg([
        'aionex_confirm' => $confirm,
    ], home_url('/'));

    // Also support frontend confirm via API token later; email uses WP confirm endpoint.
    $body = '<p>Confirm your AIONEX job alerts subscription:</p>'
        . '<p><a href="' . esc_url($confirm_url) . '">Confirm subscription</a></p>'
        . '<p>If you did not request this, ignore this email.</p>';
    aionex_send_mail($email, 'Confirm your AIONEX job alerts', $body);

    return $id;
}

function aionex_confirm_subscriber_by_token($token) {
    $posts = get_posts([
        'post_type' => 'job_subscriber',
        'post_status' => 'publish',
        'posts_per_page' => 1,
        'meta_key' => 'confirm_token',
        'meta_value' => $token,
        'fields' => 'ids',
    ]);
    if (empty($posts)) {
        return false;
    }
    update_post_meta((int) $posts[0], 'confirmed_at', gmdate('c'));
    update_post_meta((int) $posts[0], 'active', 1);
    return true;
}

add_action('init', function () {
    if (empty($_GET['aionex_confirm'])) {
        return;
    }
    $ok = aionex_confirm_subscriber_by_token(sanitize_text_field(wp_unslash($_GET['aionex_confirm'])));
    wp_die($ok ? 'Subscription confirmed. You can close this tab.' : 'Invalid or expired confirmation link.', 'AIONEX', ['response' => $ok ? 200 : 400]);
});

function aionex_unsubscribe_by_token($token) {
    $posts = get_posts([
        'post_type' => 'job_subscriber',
        'post_status' => 'publish',
        'posts_per_page' => 1,
        'meta_key' => 'unsubscribe_token',
        'meta_value' => $token,
        'fields' => 'ids',
    ]);
    if (empty($posts)) {
        return false;
    }
    update_post_meta((int) $posts[0], 'active', 0);
    return true;
}

function aionex_notify_subscribers_on_publish($new_status, $old_status, $post) {
    if ($post->post_type !== 'job' || $new_status !== 'publish' || $old_status === 'publish') {
        return;
    }
    if (get_post_meta($post->ID, 'job_status', true) === 'closed') {
        return;
    }

    $job_terms = [
        'department' => wp_get_post_terms($post->ID, 'department', ['fields' => 'slugs']),
        'location' => wp_get_post_terms($post->ID, 'location', ['fields' => 'slugs']),
    ];

    $subscribers = get_posts([
        'post_type' => 'job_subscriber',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'meta_query' => [
            ['key' => 'active', 'value' => '1'],
            ['key' => 'confirmed_at', 'value' => '', 'compare' => '!='],
        ],
    ]);

    $public = rtrim(get_option('aionex_public_site_url', home_url()), '/');
    $job_url = $public . '/jobs/' . $post->post_name;

    foreach ($subscribers as $subscriber) {
        $filters = json_decode((string) get_post_meta($subscriber->ID, 'filters', true), true);
        if (!is_array($filters)) {
            $filters = [];
        }
        $dept = sanitize_title($filters['department'] ?? '');
        $loc = sanitize_title($filters['location'] ?? '');
        if ($dept && !in_array($dept, $job_terms['department'], true)) {
            continue;
        }
        if ($loc && !in_array($loc, $job_terms['location'], true)) {
            continue;
        }

        $email = get_post_meta($subscriber->ID, 'email', true);
        $token = get_post_meta($subscriber->ID, 'unsubscribe_token', true);
        $unsub = $public . '/alerts/unsubscribe?token=' . rawurlencode($token);
        $body = '<p>New open role at AIONEX:</p>'
            . '<p><strong>' . esc_html($post->post_title) . '</strong></p>'
            . '<p><a href="' . esc_url($job_url) . '">View role</a></p>'
            . '<p><a href="' . esc_url($unsub) . '">Unsubscribe</a></p>';
        aionex_send_mail($email, 'New role: ' . $post->post_title, $body);
    }
}
