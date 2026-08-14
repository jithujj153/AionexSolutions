<?php

if (!defined('ABSPATH')) {
    exit;
}

function aionex_register_meta() {
    static $done = false;
    if ($done) {
        return;
    }
    $done = true;

    $job_fields = [
        'job_status' => 'string',
        'salary_range' => 'string',
        'featured' => 'boolean',
        'apply_deadline' => 'string',
    ];

    foreach ($job_fields as $key => $type) {
        register_post_meta('job', $key, [
            'type' => $type,
            'single' => true,
            'show_in_rest' => false,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ]);
    }

    add_action('add_meta_boxes', 'aionex_register_meta_boxes');
    add_action('save_post_job', 'aionex_save_job_metabox');
}

function aionex_register_meta_boxes() {
    add_meta_box('aionex_job_fields', 'AIONEX Job Fields', 'aionex_render_job_metabox', 'job', 'side', 'high');
    add_meta_box('aionex_application_fields', 'Application Details', 'aionex_render_application_metabox', 'application', 'normal', 'high');
    add_meta_box('aionex_hire_fields', 'Hire Lead Details', 'aionex_render_hire_metabox', 'hire_lead', 'normal', 'high');
}

function aionex_render_job_metabox($post) {
    wp_nonce_field('aionex_job_meta', 'aionex_job_meta_nonce');
    $status = get_post_meta($post->ID, 'job_status', true) ?: 'open';
    $salary = get_post_meta($post->ID, 'salary_range', true);
    $featured = (bool) get_post_meta($post->ID, 'featured', true);
    $deadline = get_post_meta($post->ID, 'apply_deadline', true);
    ?>
    <p>
        <label for="aionex_job_status"><strong>Status</strong></label><br>
        <select name="aionex_job_status" id="aionex_job_status" style="width:100%">
            <option value="open" <?php selected($status, 'open'); ?>>Open</option>
            <option value="closed" <?php selected($status, 'closed'); ?>>Closed</option>
        </select>
    </p>
    <p>
        <label for="aionex_salary_range"><strong>Salary range</strong></label><br>
        <input type="text" name="aionex_salary_range" id="aionex_salary_range" value="<?php echo esc_attr($salary); ?>" style="width:100%">
    </p>
    <p>
        <label>
            <input type="checkbox" name="aionex_featured" value="1" <?php checked($featured); ?>>
            Featured on home
        </label>
    </p>
    <p>
        <label for="aionex_apply_deadline"><strong>Apply deadline</strong></label><br>
        <input type="date" name="aionex_apply_deadline" id="aionex_apply_deadline" value="<?php echo esc_attr($deadline); ?>" style="width:100%">
    </p>
    <?php
}

function aionex_save_job_metabox($post_id) {
    if (!isset($_POST['aionex_job_meta_nonce']) || !wp_verify_nonce($_POST['aionex_job_meta_nonce'], 'aionex_job_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    update_post_meta($post_id, 'job_status', sanitize_text_field($_POST['aionex_job_status'] ?? 'open'));
    update_post_meta($post_id, 'salary_range', sanitize_text_field($_POST['aionex_salary_range'] ?? ''));
    update_post_meta($post_id, 'featured', !empty($_POST['aionex_featured']) ? 1 : 0);
    update_post_meta($post_id, 'apply_deadline', sanitize_text_field($_POST['aionex_apply_deadline'] ?? ''));
}

function aionex_render_application_metabox($post) {
    $fields = [
        'job_id' => 'Job ID',
        'name' => 'Name',
        'email' => 'Email',
        'phone' => 'Phone',
        'linkedin' => 'LinkedIn',
        'cover_note' => 'Cover note',
        'submitted_at' => 'Submitted at',
        'resume_attachment_id' => 'Resume attachment ID',
    ];
    echo '<table class="widefat"><tbody>';
    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, $key, true);
        if ($key === 'resume_attachment_id' && $value) {
            $url = wp_get_attachment_url((int) $value);
            $value = $url ? '<a href="' . esc_url($url) . '" target="_blank" rel="noopener">Download resume</a>' : esc_html($value);
            echo '<tr><th>' . esc_html($label) . '</th><td>' . $value . '</td></tr>';
            continue;
        }
        echo '<tr><th>' . esc_html($label) . '</th><td>' . nl2br(esc_html((string) $value)) . '</td></tr>';
    }
    echo '</tbody></table>';
}

function aionex_render_hire_metabox($post) {
    $fields = [
        'company' => 'Company',
        'contact_name' => 'Contact name',
        'email' => 'Email',
        'phone' => 'Phone',
        'roles_needed' => 'Roles needed',
        'seniority' => 'Seniority',
        'location' => 'Location',
        'timeline' => 'Timeline',
        'notes' => 'Notes',
    ];
    echo '<table class="widefat"><tbody>';
    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, $key, true);
        echo '<tr><th>' . esc_html($label) . '</th><td>' . nl2br(esc_html((string) $value)) . '</td></tr>';
    }
    echo '</tbody></table>';
}

function aionex_maybe_seed_sample_jobs() {
    if (get_option('aionex_seeded_jobs')) {
        return;
    }
    if (!current_user_can('manage_options') && !defined('WP_CLI')) {
        // Seed once on first admin request / activation path.
    }

    $existing = get_posts([
        'post_type' => 'job',
        'posts_per_page' => 1,
        'post_status' => 'any',
        'fields' => 'ids',
    ]);
    if (!empty($existing)) {
        update_option('aionex_seeded_jobs', 1);
        return;
    }

    $samples = [
        [
            'title' => 'Senior Software Engineer',
            'content' => '<p>Build and ship core product features with a modern stack.</p><h3>Requirements</h3><ul><li>5+ years engineering experience</li><li>Strong TypeScript / React</li><li>Comfortable owning systems end to end</li></ul>',
            'department' => 'Engineering',
            'location' => 'Remote',
            'seniority' => 'Senior',
            'work_mode' => 'Remote',
            'featured' => 1,
        ],
        [
            'title' => 'Product Designer',
            'content' => '<p>Design clear, professional product experiences for B2B teams.</p><h3>Requirements</h3><ul><li>Portfolio of shipped product work</li><li>Systems thinking</li><li>Strong collaboration with product and engineering</li></ul>',
            'department' => 'Design',
            'location' => 'Bengaluru',
            'seniority' => 'Mid',
            'work_mode' => 'Hybrid',
            'featured' => 1,
        ],
        [
            'title' => 'Operations Lead',
            'content' => '<p>Own recruiting operations, process quality, and delivery cadence.</p><h3>Requirements</h3><ul><li>Experience in agency or talent ops</li><li>Excellent stakeholder communication</li><li>Process design mindset</li></ul>',
            'department' => 'Operations',
            'location' => 'Chennai',
            'seniority' => 'Lead',
            'work_mode' => 'Onsite',
            'featured' => 0,
        ],
    ];

    foreach ($samples as $sample) {
        $post_id = wp_insert_post([
            'post_type' => 'job',
            'post_status' => 'publish',
            'post_title' => $sample['title'],
            'post_content' => $sample['content'],
            'post_excerpt' => wp_strip_all_tags($sample['content']),
        ]);
        if (is_wp_error($post_id) || !$post_id) {
            continue;
        }
        update_post_meta($post_id, 'job_status', 'open');
        update_post_meta($post_id, 'featured', $sample['featured']);
        update_post_meta($post_id, 'salary_range', 'Competitive');
        wp_set_object_terms($post_id, $sample['department'], 'department');
        wp_set_object_terms($post_id, $sample['location'], 'location');
        wp_set_object_terms($post_id, $sample['seniority'], 'seniority');
        wp_set_object_terms($post_id, $sample['work_mode'], 'work_mode');
    }

    update_option('aionex_seeded_jobs', 1);
}
