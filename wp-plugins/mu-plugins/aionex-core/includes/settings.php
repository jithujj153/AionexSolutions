<?php

if (!defined('ABSPATH')) {
    exit;
}

function aionex_register_settings_page() {
    add_options_page(
        'AIONEX Settings',
        'AIONEX',
        'manage_options',
        'aionex-settings',
        'aionex_render_settings_page'
    );
}

function aionex_register_settings() {
    register_setting('aionex_settings', 'aionex_hr_emails', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => get_option('admin_email'),
    ]);
    register_setting('aionex_settings', 'aionex_from_email', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_email',
        'default' => get_option('admin_email'),
    ]);
    register_setting('aionex_settings', 'aionex_from_name', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_text_field',
        'default' => 'AIONEX Careers',
    ]);
    register_setting('aionex_settings', 'aionex_cors_origins', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_textarea_field',
        'default' => "http://localhost:3000\nhttps://localhost:3000",
    ]);
    register_setting('aionex_settings', 'aionex_public_site_url', [
        'type' => 'string',
        'sanitize_callback' => 'esc_url_raw',
        'default' => 'http://localhost:3000',
    ]);
}

function aionex_render_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }
    ?>
    <div class="wrap">
        <h1>AIONEX Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('aionex_settings'); ?>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row"><label for="aionex_hr_emails">Admin / HR emails</label></th>
                    <td>
                        <input name="aionex_hr_emails" id="aionex_hr_emails" type="text" class="regular-text" value="<?php echo esc_attr(get_option('aionex_hr_emails', get_option('admin_email'))); ?>">
                        <p class="description">Comma-separated. Receives applications, hire leads, and contact forms.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="aionex_from_name">From name</label></th>
                    <td><input name="aionex_from_name" id="aionex_from_name" type="text" class="regular-text" value="<?php echo esc_attr(get_option('aionex_from_name', 'AIONEX Careers')); ?>"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="aionex_from_email">From email</label></th>
                    <td><input name="aionex_from_email" id="aionex_from_email" type="email" class="regular-text" value="<?php echo esc_attr(get_option('aionex_from_email', get_option('admin_email'))); ?>"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="aionex_public_site_url">Public Next.js site URL</label></th>
                    <td><input name="aionex_public_site_url" id="aionex_public_site_url" type="url" class="regular-text" value="<?php echo esc_attr(get_option('aionex_public_site_url', 'http://localhost:3000')); ?>"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="aionex_cors_origins">CORS origins</label></th>
                    <td>
                        <textarea name="aionex_cors_origins" id="aionex_cors_origins" rows="5" class="large-text"><?php echo esc_textarea(get_option('aionex_cors_origins', "http://localhost:3000\nhttps://localhost:3000")); ?></textarea>
                        <p class="description">One origin per line. Public site URL above is auto-allowed. <code>*.vercel.app</code> previews are allowed by the plugin for staging.</p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
        <p><strong>Required for email:</strong> Plugins → Add New → install <strong>WP Mail SMTP</strong>, connect Hostinger mailbox or Gmail/Resend, send a test email. Until SMTP works, apply/hire still save in Applications / Hire Leads but inbox delivery may fail.</p>
    </div>
    <?php
}
