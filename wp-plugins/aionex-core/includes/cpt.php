<?php

if (!defined('ABSPATH')) {
    exit;
}

function aionex_register_cpts() {
    register_post_type('job', [
        'labels' => [
            'name' => 'Jobs',
            'singular_name' => 'Job',
            'add_new_item' => 'Add New Job',
            'edit_item' => 'Edit Job',
        ],
        'public' => true,
        'show_in_rest' => false,
        'menu_icon' => 'dashicons-id-alt',
        'supports' => ['title', 'editor', 'excerpt'],
        'has_archive' => false,
        'rewrite' => ['slug' => 'jobs'],
    ]);

    register_post_type('application', [
        'labels' => [
            'name' => 'Applications',
            'singular_name' => 'Application',
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => ['title'],
        'capability_type' => 'post',
    ]);

    register_post_type('hire_lead', [
        'labels' => [
            'name' => 'Hire Leads',
            'singular_name' => 'Hire Lead',
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-businessman',
        'supports' => ['title'],
    ]);

    register_post_type('job_subscriber', [
        'labels' => [
            'name' => 'Subscribers',
            'singular_name' => 'Subscriber',
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-email-alt',
        'supports' => ['title'],
    ]);
}
