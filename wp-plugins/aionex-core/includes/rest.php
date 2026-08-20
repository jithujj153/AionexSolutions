<?php

if (!defined('ABSPATH')) {
    exit;
}

function aionex_term_payload($post_id, $taxonomy) {
    $terms = wp_get_post_terms($post_id, $taxonomy);
    if (empty($terms) || is_wp_error($terms)) {
        return null;
    }
    $term = $terms[0];
    return [
        'slug' => $term->slug,
        'name' => $term->name,
    ];
}

function aionex_serialize_job($post) {
    $status = get_post_meta($post->ID, 'job_status', true) ?: 'open';
    return [
        'id' => $post->ID,
        'slug' => $post->post_name,
        'title' => get_the_title($post),
        'excerpt' => wp_strip_all_tags($post->post_excerpt ?: wp_trim_words($post->post_content, 36)),
        'content' => aionex_sanitize_html(apply_filters('the_content', $post->post_content)),
        'status' => $status,
        'featured' => (bool) get_post_meta($post->ID, 'featured', true),
        'salary_range' => (string) get_post_meta($post->ID, 'salary_range', true),
        'posted_at' => get_post_time('c', true, $post),
        'location' => aionex_term_payload($post->ID, 'location'),
        'department' => aionex_term_payload($post->ID, 'department'),
        'seniority' => aionex_term_payload($post->ID, 'seniority'),
        'work_mode' => aionex_term_payload($post->ID, 'work_mode'),
    ];
}

function aionex_register_rest_routes() {
    register_rest_route('aionex/v1', '/jobs', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => 'aionex_rest_list_jobs',
    ]);

    register_rest_route('aionex/v1', '/jobs/(?P<slug>[a-z0-9\-]+)', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => 'aionex_rest_get_job',
    ]);

    register_rest_route('aionex/v1', '/job-filters', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => 'aionex_rest_job_filters',
    ]);

    register_rest_route('aionex/v1', '/apply', [
        'methods' => 'POST',
        'permission_callback' => '__return_true',
        'callback' => 'aionex_rest_apply',
    ]);

    register_rest_route('aionex/v1', '/hire', [
        'methods' => 'POST',
        'permission_callback' => '__return_true',
        'callback' => 'aionex_rest_hire',
    ]);

    register_rest_route('aionex/v1', '/subscribe', [
        'methods' => 'POST',
        'permission_callback' => '__return_true',
        'callback' => 'aionex_rest_subscribe',
    ]);

    register_rest_route('aionex/v1', '/unsubscribe', [
        'methods' => 'POST',
        'permission_callback' => '__return_true',
        'callback' => 'aionex_rest_unsubscribe',
    ]);

    register_rest_route('aionex/v1', '/contact', [
        'methods' => 'POST',
        'permission_callback' => '__return_true',
        'callback' => 'aionex_rest_contact',
    ]);
}

function aionex_rest_list_jobs(WP_REST_Request $request) {
    $page = max(1, (int) $request->get_param('page'));
    $per_page = min(50, max(1, (int) ($request->get_param('per_page') ?: 20)));
    $tax_query = [];

    foreach (['location', 'department', 'seniority', 'work_mode'] as $tax) {
        $value = sanitize_title((string) $request->get_param($tax));
        if ($value) {
            $tax_query[] = [
                'taxonomy' => $tax,
                'field' => 'slug',
                'terms' => [$value],
            ];
        }
    }

    $args = [
        'post_type' => 'job',
        'post_status' => 'publish',
        'posts_per_page' => $per_page,
        'paged' => $page,
        's' => sanitize_text_field((string) $request->get_param('q')),
        'meta_query' => [
            [
                'key' => 'job_status',
                'value' => 'open',
            ],
        ],
        'orderby' => 'date',
        'order' => 'DESC',
    ];

    if ($request->get_param('featured')) {
        $args['meta_query'][] = [
            'key' => 'featured',
            'value' => '1',
        ];
    }

    if ($tax_query) {
        $args['tax_query'] = array_merge(['relation' => 'AND'], $tax_query);
    }

    $query = new WP_Query($args);
    $jobs = array_map('aionex_serialize_job', $query->posts);

    return rest_ensure_response([
        'jobs' => $jobs,
        'total' => (int) $query->found_posts,
        'page' => $page,
        'per_page' => $per_page,
        'total_pages' => (int) $query->max_num_pages,
    ]);
}

function aionex_rest_get_job(WP_REST_Request $request) {
    $slug = sanitize_title($request['slug']);
    $posts = get_posts([
        'post_type' => 'job',
        'name' => $slug,
        'post_status' => 'publish',
        'posts_per_page' => 1,
        'meta_key' => 'job_status',
        'meta_value' => 'open',
    ]);
    if (empty($posts)) {
        return new WP_Error('not_found', 'Job not found or closed', ['status' => 404]);
    }
    return rest_ensure_response(aionex_serialize_job($posts[0]));
}

function aionex_rest_job_filters() {
    $payload = [];
    foreach (['locations' => 'location', 'departments' => 'department', 'seniorities' => 'seniority', 'work_modes' => 'work_mode'] as $key => $taxonomy) {
        $terms = get_terms([
            'taxonomy' => $taxonomy,
            'hide_empty' => false,
        ]);
        $payload[$key] = [];
        if (!is_wp_error($terms)) {
            foreach ($terms as $term) {
                $payload[$key][] = [
                    'slug' => $term->slug,
                    'name' => $term->name,
                ];
            }
        }
    }
    return rest_ensure_response($payload);
}

function aionex_rest_apply(WP_REST_Request $request) {
    if (aionex_is_honeypot_tripped($request)) {
        return rest_ensure_response(['ok' => true, 'message' => 'Application sent — AIONEX HR will review and contact you.']);
    }
    if (!aionex_rate_limit('apply')) {
        return new WP_Error('rate_limited', 'Too many applications. Try again later.', ['status' => 429]);
    }

    $job_id = (int) $request->get_param('job_id');
    $job_slug = sanitize_title((string) $request->get_param('job_slug'));
    if (!$job_id && $job_slug) {
        $by_slug = get_page_by_path($job_slug, OBJECT, 'job');
        if ($by_slug) {
            $job_id = (int) $by_slug->ID;
        }
    }

    $general = $job_id <= 0;
    $job = $general ? null : get_post($job_id);
    if (!$general && (!$job || $job->post_type !== 'job' || $job->post_status !== 'publish' || get_post_meta($job_id, 'job_status', true) === 'closed')) {
        return new WP_Error('invalid_job', 'This role is not open for applications.', ['status' => 400]);
    }

    $first = sanitize_text_field((string) $request->get_param('first_name'));
    $last = sanitize_text_field((string) $request->get_param('last_name'));
    $name = sanitize_text_field((string) $request->get_param('name'));
    if (!$name) {
        $name = trim($first . ' ' . $last);
    }
    $email = sanitize_email((string) $request->get_param('email'));
    $country_code = sanitize_text_field((string) $request->get_param('country_code'));
    $mobile = sanitize_text_field((string) $request->get_param('mobile'));
    $phone = sanitize_text_field((string) $request->get_param('phone'));
    if (!$phone && $mobile) {
        $phone = trim($country_code . ' ' . $mobile);
    }
    $linkedin = esc_url_raw((string) $request->get_param('linkedin'));
    $cover = sanitize_textarea_field((string) $request->get_param('cover_note'));
    $country = sanitize_text_field((string) $request->get_param('country'));
    $experience = sanitize_text_field((string) $request->get_param('experience'));
    $user_type = sanitize_text_field((string) $request->get_param('user_type'));
    $skills = sanitize_text_field((string) $request->get_param('skills'));
    $skill_list = array_values(array_filter(array_map('trim', preg_split('/[,;]+/', $skills) ?: [])));
    if (count($skill_list) > 5) {
        return new WP_Error('too_many_skills', 'Enter up to 5 skills only.', ['status' => 400]);
    }
    $skills = implode(', ', $skill_list);

    if (!$name || !is_email($email) || !$phone) {
        return new WP_Error('invalid_fields', 'Name, email, and phone are required.', ['status' => 400]);
    }
    if ($general && (!$experience || !$user_type || !$skills)) {
        return new WP_Error('invalid_fields', 'Experience, user type, and skills are required.', ['status' => 400]);
    }

    $files = $request->get_file_params();
    if (empty($files['resume'])) {
        return new WP_Error('resume_required', 'Resume is required.', ['status' => 400]);
    }

    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';
    require_once ABSPATH . 'wp-admin/includes/image.php';

    $file = $files['resume'];
    $allowed = ['pdf', 'doc', 'docx'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowed, true)) {
        return new WP_Error('invalid_resume', 'Resume must be PDF, DOC, or DOCX.', ['status' => 400]);
    }
    if (($file['size'] ?? 0) > 5 * 1024 * 1024) {
        return new WP_Error('resume_too_large', 'Resume must be under 5MB.', ['status' => 400]);
    }

    $upload = wp_handle_upload($file, ['test_form' => false]);
    if (isset($upload['error'])) {
        return new WP_Error('upload_failed', $upload['error'], ['status' => 500]);
    }

    $attachment = [
        'post_mime_type' => $upload['type'],
        'post_title' => sanitize_file_name(pathinfo($upload['file'], PATHINFO_FILENAME)),
        'post_content' => '',
        'post_status' => 'inherit',
    ];
    $attach_id = wp_insert_attachment($attachment, $upload['file']);
    if (is_wp_error($attach_id)) {
        return new WP_Error('upload_failed', 'Unable to store resume.', ['status' => 500]);
    }

    $app_id = wp_insert_post([
        'post_type' => 'application',
        'post_status' => 'publish',
        'post_title' => $name . ' — ' . ($job ? get_the_title($job_id) : 'Resume registration'),
    ]);
    if (is_wp_error($app_id) || !$app_id) {
        return new WP_Error('apply_failed', 'Unable to save application.', ['status' => 500]);
    }

    if ($job_id) {
        update_post_meta($app_id, 'job_id', $job_id);
    }
    update_post_meta($app_id, 'name', $name);
    update_post_meta($app_id, 'first_name', $first);
    update_post_meta($app_id, 'last_name', $last);
    update_post_meta($app_id, 'email', $email);
    update_post_meta($app_id, 'phone', $phone);
    update_post_meta($app_id, 'country', $country);
    update_post_meta($app_id, 'country_code', $country_code);
    update_post_meta($app_id, 'experience', $experience);
    update_post_meta($app_id, 'user_type', $user_type);
    update_post_meta($app_id, 'skills', $skills);
    update_post_meta($app_id, 'linkedin', $linkedin);
    update_post_meta($app_id, 'cover_note', $cover);
    update_post_meta($app_id, 'resume_attachment_id', $attach_id);
    update_post_meta($app_id, 'submitted_at', gmdate('c'));
    update_post_meta($app_id, 'ip_hash', hash('sha256', $_SERVER['REMOTE_ADDR'] ?? ''));

    aionex_notify_hr_application($app_id, $job_id);
    aionex_notify_applicant_received($app_id, $job_id);

    return rest_ensure_response([
        'ok' => true,
        'message' => $general
            ? 'Resume received — AIONEX HR will review and contact you.'
            : 'Application sent — AIONEX HR will review and contact you.',
    ]);
}

function aionex_rest_hire(WP_REST_Request $request) {
    if (aionex_is_honeypot_tripped($request)) {
        return rest_ensure_response(['ok' => true, 'message' => 'Our team will contact you.']);
    }
    if (!aionex_rate_limit('hire')) {
        return new WP_Error('rate_limited', 'Too many requests. Try again later.', ['status' => 429]);
    }

    $company = sanitize_text_field((string) $request->get_param('company'));
    $contact = sanitize_text_field((string) $request->get_param('contact_name'));
    $email = sanitize_email((string) $request->get_param('email'));
    if (!$company || !$contact || !is_email($email)) {
        return new WP_Error('invalid_fields', 'Company, contact name, and email are required.', ['status' => 400]);
    }

    $lead_id = wp_insert_post([
        'post_type' => 'hire_lead',
        'post_status' => 'publish',
        'post_title' => $company . ' — ' . $contact,
    ]);
    if (is_wp_error($lead_id) || !$lead_id) {
        return new WP_Error('hire_failed', 'Unable to save hire request.', ['status' => 500]);
    }

    foreach (['company', 'contact_name', 'email', 'phone', 'roles_needed', 'seniority', 'location', 'timeline', 'notes'] as $key) {
        $value = $request->get_param($key);
        if (in_array($key, ['roles_needed', 'notes'], true)) {
            update_post_meta($lead_id, $key, sanitize_textarea_field((string) $value));
        } elseif ($key === 'email') {
            update_post_meta($lead_id, $key, sanitize_email((string) $value));
        } else {
            update_post_meta($lead_id, $key, sanitize_text_field((string) $value));
        }
    }

    aionex_notify_hr_hire($lead_id);
    aionex_notify_hire_received($lead_id);

    return rest_ensure_response([
        'ok' => true,
        'message' => 'Our team will contact you.',
    ]);
}

function aionex_rest_subscribe(WP_REST_Request $request) {
    if (aionex_is_honeypot_tripped($request)) {
        return rest_ensure_response(['ok' => true, 'message' => 'Check your inbox to confirm your subscription.']);
    }
    if (!aionex_rate_limit('subscribe')) {
        return new WP_Error('rate_limited', 'Too many requests. Try again later.', ['status' => 429]);
    }

    $email = sanitize_email((string) $request->get_param('email'));
    if (!is_email($email)) {
        return new WP_Error('invalid_email', 'A valid email is required.', ['status' => 400]);
    }

    $result = aionex_create_subscriber($email, [
        'department' => sanitize_title((string) $request->get_param('department')),
        'location' => sanitize_title((string) $request->get_param('location')),
    ]);
    if (is_wp_error($result)) {
        return $result;
    }

    return rest_ensure_response([
        'ok' => true,
        'message' => 'Check your inbox to confirm your subscription.',
    ]);
}

function aionex_rest_unsubscribe(WP_REST_Request $request) {
    $token = sanitize_text_field((string) $request->get_param('token'));
    if (!$token || !aionex_unsubscribe_by_token($token)) {
        return new WP_Error('invalid_token', 'Invalid unsubscribe token.', ['status' => 400]);
    }
    return rest_ensure_response([
        'ok' => true,
        'message' => 'You have been unsubscribed.',
    ]);
}

function aionex_rest_contact(WP_REST_Request $request) {
    if (aionex_is_honeypot_tripped($request)) {
        return rest_ensure_response(['ok' => true, 'message' => 'Message sent. We will get back to you shortly.']);
    }
    if (!aionex_rate_limit('contact')) {
        return new WP_Error('rate_limited', 'Too many requests. Try again later.', ['status' => 429]);
    }

    $name = sanitize_text_field((string) $request->get_param('name'));
    $email = sanitize_email((string) $request->get_param('email'));
    $message = sanitize_textarea_field((string) $request->get_param('message'));
    if (!$name || !is_email($email) || !$message) {
        return new WP_Error('invalid_fields', 'Name, email, and message are required.', ['status' => 400]);
    }

    aionex_notify_hr_contact($name, $email, $message);
    aionex_notify_contact_received($name, $email);

    return rest_ensure_response([
        'ok' => true,
        'message' => 'Message sent. We will get back to you shortly.',
    ]);
}
