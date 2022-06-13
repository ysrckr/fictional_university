/** @noinspection ALL */<?php

function university_post_types()
{
    //Campus Post Type
    register_post_type('campus', [
        'capability_type' => 'campus',
        'map_meta_cap' => true,
        'supports' => [
            'title', 'editor', 'excerpt',
        ],
        'rewrite' => [
            'slug' => 'campuses',
        ],
        'has_archive' => true,
        'public' => true,
        'labels' => [
            'name' => 'Campuses',
            'add_new_item' => 'Add New Campus',
            'edit_item' => 'Edit Campus',
            'all_items' => 'All Campuses',
            'singular_name' => 'Campus',
        ],
        'menu_icon' => 'dashicons-location-alt',
        'show_in_rest' => true,
    ]);
    //Event Post Type
    register_post_type('event', [
        'capability_type' => 'event',
        'map_meta_cap' => true,
        'supports' => [
            'title', 'editor', 'excerpt',
        ],
        'rewrite' => [
            'slug' => 'events',
        ],
        'has_archive' => true,
        'public' => true,
        'labels' => [
            'name' => 'Events',
            'add_new_item' => 'Add New Event',
            'edit_item' => 'Edit Event',
            'all_items' => 'All Events',
            'singular_name' => 'Event',
        ],
        'menu_icon' => 'dashicons-groups',
        'show_in_rest' => true,

    ]);
    //Program Post Type
    register_post_type('program', [
        'supports' => [
            'title', 'editor',
        ],
        'rewrite' => [
            'slug' => 'programs',
        ],
        'has_archive' => true,
        'public' => true,
        'labels' => [
            'name' => 'Programs',
            'add_new_item' => 'Add New Program',
            'edit_item' => 'Edit Program',
            'all_items' => 'All Programs',
            'singular_name' => 'Program',
        ],
        'menu_icon' => 'dashicons-awards',
        'show_in_rest' => true,

    ]);
    //Professor Post Type
    register_post_type('professor', [
        'supports' => [
            'title', 'editor', 'thumbnail',
        ],
        'public' => true,
        'labels' => [
            'name' => 'Professors',
            'add_new_item' => 'Add New Professor',
            'edit_item' => 'Edit Professor',
            'all_items' => 'All Professors',
            'singular_name' => 'Professor',
        ],
        'menu_icon' => 'dashicons-welcome-learn-more',
        'show_in_rest' => true,

    ]);

    //Note Post Type
    register_post_type('note', [
        'supports' => [
            'title', 'editor',
        ],
        'public' => false,
        'show_ui' => true,
        'labels' => [
            'name' => 'Notes',
            'add_new_item' => 'Add New Note',
            'edit_item' => 'Edit Note',
            'all_items' => 'All Notes',
            'singular_name' => 'Note',
        ],
        'menu_icon' => 'dashicons-welcome-write-blog',
        'show_in_rest' => true,

    ]);
}

add_action('init', 'university_post_types');


