<?php

if (!defined('ABSPATH')) {
    exit;
}

function aionex_get_cors_origins() {
    $raw = get_option('aionex_cors_origins', "http://localhost:3000\nhttps://localhost:3000");
    $origins = array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', (string) $raw)));
    $public = trim((string) get_option('aionex_public_site_url', ''));
    if ($public !== '') {
        $origins[] = untrailingslashit($public);
    }
    return array_values(array_unique($origins));
}

/**
 * Exact allow-list + Vercel preview/production (*.vercel.app) for staging deploy.
 * Lock to exact domains later by removing vercel.app match and listing only production.
 */
function aionex_is_origin_allowed($origin) {
    if ($origin === '') {
        return false;
    }
    if (in_array($origin, aionex_get_cors_origins(), true)) {
        return true;
    }
    // e.g. https://aionex.vercel.app or https://aionex-git-main-team.vercel.app
    if (preg_match('#^https://[a-z0-9][a-z0-9.-]*\.vercel\.app$#i', $origin)) {
        return true;
    }
    return false;
}

function aionex_handle_cors() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin && aionex_is_origin_allowed($origin)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Accept');
        header('Access-Control-Allow-Credentials: true');
        header('Vary: Origin');
    }
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        status_header(204);
        exit;
    }
}

add_action('init', function () {
    if (strpos($_SERVER['REQUEST_URI'] ?? '', '/wp-json/aionex/') !== false) {
        aionex_handle_cors();
    }
});

function aionex_is_honeypot_tripped($request) {
    $value = '';
    if ($request instanceof WP_REST_Request) {
        $value = (string) $request->get_param('company_url');
    }
    return $value !== '';
}

function aionex_rate_limit($bucket, $limit = 8, $window = 600) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = 'aionex_rl_' . md5($bucket . '|' . $ip);
    $data = get_transient($key);
    if (!is_array($data)) {
        $data = ['count' => 0, 'start' => time()];
    }
    if ((time() - (int) $data['start']) > $window) {
        $data = ['count' => 0, 'start' => time()];
    }
    $data['count']++;
    set_transient($key, $data, $window);
    return $data['count'] <= $limit;
}

function aionex_sanitize_html($html) {
    return wp_kses_post($html);
}
