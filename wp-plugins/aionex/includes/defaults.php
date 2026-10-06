<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Apply staging/production defaults once per plugin version.
 * Safe to re-run: only fills empty options and merges known CORS origins.
 */
function aionex_ensure_defaults() {
    $marker = 'aionex_defaults_' . AIONEX_CORE_VERSION;
    if (get_option($marker) === '1') {
        return;
    }

    $hr = trim((string) get_option('aionex_hr_emails', ''));
    if ($hr === '') {
        update_option('aionex_hr_emails', 'career@aionexoutsourcing.com');
    }

    $from = trim((string) get_option('aionex_from_email', ''));
    if ($from === '' || !is_email($from)) {
        update_option('aionex_from_email', 'career@aionexoutsourcing.com');
    }

    if (trim((string) get_option('aionex_from_name', '')) === '') {
        update_option('aionex_from_name', 'AIONEX Careers');
    }

    $public = trim((string) get_option('aionex_public_site_url', ''));
    if ($public === '') {
        update_option('aionex_public_site_url', 'http://localhost:3000');
    }

    $needed = [
        'http://localhost:3000',
        'https://localhost:3000',
    ];
    $raw = (string) get_option('aionex_cors_origins', '');
    $existing = array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $raw)));
    $merged = array_values(array_unique(array_merge($existing, $needed)));
    update_option('aionex_cors_origins', implode("\n", $merged));

    update_option($marker, '1');
}
