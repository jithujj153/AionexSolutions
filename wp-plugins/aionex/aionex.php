<?php
/**
 * Plugin Name: AIONEX Core
 * Description: Jobs, applications, hire leads, subscribers, REST API, and email hooks for AIONEX.
 * Version: 1.0.1
 * Author: AIONEX
 * Text Domain: aionex-core
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!defined('AIONEX_CORE_VERSION')) {
    define('AIONEX_CORE_VERSION', '1.0.1');
}
if (!defined('AIONEX_CORE_PATH')) {
    define('AIONEX_CORE_PATH', plugin_dir_path(__FILE__));
}
if (!defined('AIONEX_CORE_URL')) {
    define('AIONEX_CORE_URL', plugin_dir_url(__FILE__));
}

require_once AIONEX_CORE_PATH . 'includes/cpt.php';
require_once AIONEX_CORE_PATH . 'includes/taxonomies.php';
require_once AIONEX_CORE_PATH . 'includes/meta.php';
require_once AIONEX_CORE_PATH . 'includes/security.php';
require_once AIONEX_CORE_PATH . 'includes/mail.php';
require_once AIONEX_CORE_PATH . 'includes/settings.php';
require_once AIONEX_CORE_PATH . 'includes/subscribers.php';
require_once AIONEX_CORE_PATH . 'includes/rest.php';

/**
 * Works for normal plugins and must-use installs (no Activate click needed for MU).
 */
function aionex_bootstrap_runtime() {
    aionex_register_cpts();
    aionex_register_taxonomies();
    aionex_register_meta();

    if (get_option('aionex_core_version') !== AIONEX_CORE_VERSION) {
        flush_rewrite_rules(false);
        update_option('aionex_core_version', AIONEX_CORE_VERSION);
    }

    aionex_maybe_seed_sample_jobs();
}

register_activation_hook(__FILE__, function () {
    aionex_bootstrap_runtime();
    flush_rewrite_rules();
});

register_deactivation_hook(__FILE__, function () {
    flush_rewrite_rules();
});

add_action('init', 'aionex_bootstrap_runtime', 5);
add_action('rest_api_init', 'aionex_register_rest_routes');
add_action('admin_menu', 'aionex_register_settings_page');
add_action('admin_init', 'aionex_register_settings');
add_action('transition_post_status', 'aionex_notify_subscribers_on_publish', 10, 3);
