<?php

if (!defined('ABSPATH')) {
    exit;
}

function aionex_get_hr_emails() {
    $raw = get_option('aionex_hr_emails', 'Business@aionexoutsourcing.com');
    $emails = array_filter(array_map('trim', explode(',', (string) $raw)));
    $valid = [];
    foreach ($emails as $email) {
        if (is_email($email)) {
            $valid[] = $email;
        }
    }
    if ($valid) {
        return $valid;
    }
    $fallback = get_option('admin_email');
    return is_email($fallback) ? [$fallback] : ['Business@aionexoutsourcing.com'];
}

function aionex_primary_hr_email() {
    $emails = aionex_get_hr_emails();
    return $emails[0] ?? 'Business@aionexoutsourcing.com';
}

function aionex_mail_headers($extra = []) {
    $from_email = get_option('aionex_from_email', get_option('admin_email'));
    $from_name = get_option('aionex_from_name', 'AIONEX Careers');
    $headers = [
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $from_name . ' <' . $from_email . '>',
    ];
    return array_merge($headers, $extra);
}

function aionex_auto_reply_headers() {
    return aionex_mail_headers([
        'Reply-To: ' . aionex_primary_hr_email(),
    ]);
}

function aionex_send_mail($to, $subject, $body, $attachments = [], $headers = null) {
    $headers = $headers !== null ? $headers : aionex_mail_headers();
    $ok = wp_mail($to, $subject, $body, $headers, $attachments);
    if (!$ok) {
        error_log('[AIONEX] wp_mail failed to=' . $to . ' subject=' . $subject);
    }
    return $ok;
}

function aionex_notify_hr_application($application_id, $job_id) {
    $job = get_post($job_id);
    $name = get_post_meta($application_id, 'name', true);
    $email = get_post_meta($application_id, 'email', true);
    $phone = get_post_meta($application_id, 'phone', true);
    $linkedin = get_post_meta($application_id, 'linkedin', true);
    $note = get_post_meta($application_id, 'cover_note', true);
    $resume_id = (int) get_post_meta($application_id, 'resume_attachment_id', true);
    $resume_url = $resume_id ? wp_get_attachment_url($resume_id) : '';
    $resume_path = $resume_id ? get_attached_file($resume_id) : '';

    $subject = 'New application: ' . ($job ? $job->post_title : 'Resume registration');
    $body = '<p>A new candidate applied via the AIONEX site.</p>'
        . '<p><strong>Job:</strong> ' . esc_html($job ? $job->post_title : 'Resume registration') . '<br>'
        . '<strong>Name:</strong> ' . esc_html($name) . '<br>'
        . '<strong>Email:</strong> ' . esc_html($email) . '<br>'
        . '<strong>Phone:</strong> ' . esc_html($phone) . '<br>'
        . '<strong>Country:</strong> ' . esc_html(get_post_meta($application_id, 'country', true)) . '<br>'
        . '<strong>Experience:</strong> ' . esc_html(get_post_meta($application_id, 'experience', true)) . '<br>'
        . '<strong>User type:</strong> ' . esc_html(get_post_meta($application_id, 'user_type', true)) . '<br>'
        . '<strong>Skills:</strong> ' . esc_html(get_post_meta($application_id, 'skills', true)) . '<br>'
        . '<strong>LinkedIn:</strong> ' . esc_html($linkedin) . '</p>'
        . '<p><strong>Cover note:</strong><br>' . nl2br(esc_html($note)) . '</p>'
        . ($resume_url ? '<p><a href="' . esc_url($resume_url) . '">Download resume</a></p>' : '')
        . '<p>Review in WordPress → Applications.</p>';

    $attachments = ($resume_path && file_exists($resume_path)) ? [$resume_path] : [];
    foreach (aionex_get_hr_emails() as $to) {
        aionex_send_mail($to, $subject, $body, $attachments);
    }
}

function aionex_notify_applicant_received($application_id, $job_id) {
    $job = get_post($job_id);
    $name = get_post_meta($application_id, 'name', true);
    $email = get_post_meta($application_id, 'email', true);
    if (!is_email($email)) {
        return false;
    }

    $job_title = $job ? $job->post_title : 'AIONEX talent pool';
    $subject = $job ? 'We received your application — ' . $job_title : 'We received your resume — AIONEX';
    $greeting = $name ? 'Hi ' . esc_html($name) . ',' : 'Hi,';
    $body = '<p>' . $greeting . '</p>'
        . '<p>Thank you for sharing your profile' . ($job ? ' for <strong>' . esc_html($job_title) . '</strong>' : '') . ' through AIONEX.</p>'
        . '<p>Our recruiting team has received your application and will review it shortly. If your profile is a strong match, we will contact you directly.</p>'
        . '<p>No further action is needed from you right now.</p>'
        . '<p>— AIONEX Careers<br>'
        . '<a href="mailto:' . esc_attr(aionex_primary_hr_email()) . '">' . esc_html(aionex_primary_hr_email()) . '</a></p>';

    return aionex_send_mail($email, $subject, $body, [], aionex_auto_reply_headers());
}

function aionex_notify_hr_hire($lead_id) {
    $subject = 'New hire request: ' . get_post_meta($lead_id, 'company', true);
    $body = '<p>New employer hire request.</p><ul>';
    foreach (['company', 'contact_name', 'email', 'phone', 'roles_needed', 'seniority', 'location', 'timeline', 'notes'] as $key) {
        $body .= '<li><strong>' . esc_html($key) . ':</strong> ' . nl2br(esc_html((string) get_post_meta($lead_id, $key, true))) . '</li>';
    }
    $body .= '</ul>';
    foreach (aionex_get_hr_emails() as $to) {
        aionex_send_mail($to, $subject, $body);
    }
}

function aionex_notify_hire_received($lead_id) {
    $email = get_post_meta($lead_id, 'email', true);
    $contact = get_post_meta($lead_id, 'contact_name', true);
    $company = get_post_meta($lead_id, 'company', true);
    if (!is_email($email)) {
        return false;
    }

    $subject = 'We received your hire request — AIONEX';
    $greeting = $contact ? 'Hi ' . esc_html($contact) . ',' : 'Hi,';
    $body = '<p>' . $greeting . '</p>'
        . '<p>Thank you for reaching out to AIONEX'
        . ($company ? ' on behalf of <strong>' . esc_html($company) . '</strong>' : '')
        . '.</p>'
        . '<p>We have received your hire request. A recruiter will review your needs and follow up shortly.</p>'
        . '<p>— AIONEX Careers<br>'
        . '<a href="mailto:' . esc_attr(aionex_primary_hr_email()) . '">' . esc_html(aionex_primary_hr_email()) . '</a></p>';

    return aionex_send_mail($email, $subject, $body, [], aionex_auto_reply_headers());
}

function aionex_notify_hr_contact($name, $email, $message) {
    $subject = 'New contact message from ' . $name;
    $body = '<p><strong>Name:</strong> ' . esc_html($name) . '<br><strong>Email:</strong> ' . esc_html($email) . '</p>'
        . '<p>' . nl2br(esc_html($message)) . '</p>';
    foreach (aionex_get_hr_emails() as $to) {
        aionex_send_mail($to, $subject, $body);
    }
}

function aionex_notify_contact_received($name, $email) {
    if (!is_email($email)) {
        return false;
    }

    $subject = 'We received your message — AIONEX';
    $greeting = $name ? 'Hi ' . esc_html($name) . ',' : 'Hi,';
    $body = '<p>' . $greeting . '</p>'
        . '<p>Thank you for contacting AIONEX. We have received your message and will get back to you shortly.</p>'
        . '<p>— AIONEX Careers<br>'
        . '<a href="mailto:' . esc_attr(aionex_primary_hr_email()) . '">' . esc_html(aionex_primary_hr_email()) . '</a></p>';

    return aionex_send_mail($email, $subject, $body, [], aionex_auto_reply_headers());
}
