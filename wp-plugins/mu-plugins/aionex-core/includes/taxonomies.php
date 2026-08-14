<?php

if (!defined('ABSPATH')) {
    exit;
}

function aionex_register_taxonomies() {
    $taxonomies = [
        'location' => 'Locations',
        'department' => 'Departments',
        'seniority' => 'Seniorities',
        'work_mode' => 'Work Modes',
    ];

    foreach ($taxonomies as $slug => $label) {
        register_taxonomy($slug, 'job', [
            'labels' => [
                'name' => $label,
                'singular_name' => rtrim($label, 's'),
            ],
            'public' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'hierarchical' => false,
            'show_in_rest' => false,
            'rewrite' => ['slug' => $slug],
        ]);
    }
}
