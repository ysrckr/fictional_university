<?php
add_action('rest_api_init', 'universityRegisterSearch');

function universityRegisterSearch()
{
    register_rest_route('university/v1', 'search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'universitySearchResults',
    ));
}

function universitySearchResults($data)
{
    $mainQuery = new WP_Query(array(
        'post_type' => array('post', 'page', 'professor', 'program', 'event', 'campus'),
        's' => sanitize_text_field($data['term']),
    ));
    $results = array(
        'generalInfo' => array(),
        'professors' => array(),
        'programs' => array(),
        'events' => array(),
        'campuses' => array(),
    );
    while ($mainQuery->have_posts()) {
        $mainQuery->the_post();
        if (get_post_type() === 'post' || get_post_type() === 'page') {
            array_push($results['generalInfo'], array(
                'post_type' => get_post_type(),
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'author_name' => get_the_author())
            );
        }
        ;
        if (get_post_type() === 'professor') {
            array_push($results['professors'], array(
                'post_type' => get_post_type(),
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'img' => array(
                    'url' => get_the_post_thumbnail_url(0, 'professorLandscape'),
                    'alt' => get_post_meta(get_post_thumbnail_id(), '_wp_attachment_image_alt', true),
                ))
            );
        }
        ;
        if (get_post_type() === 'program') {
            $relatedCampuses = get_field('related_campus');
            if ($relatedCampuses) {
                foreach ($relatedCampuses as $campus) {
                    array_push($results['campuses'], array(
                        'post_type' => get_post_type($campus),
                        'title' => get_the_title($campus),
                        'permalink' => get_the_permalink($campus),
                    ));
                }
            }
            array_push($results['programs'], array(
                'post_type' => get_post_type(),
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'id' => get_the_ID(),
            )
            );
        }
        ;
        if (get_post_type() === 'event') {
            $eventDate = new DateTime(get_field('event_date'));
            $description = null;
            if (!has_excerpt()) {
                $description = wp_trim_words(get_the_content(), 18);
            } else { $description = get_the_excerpt();}
            array_push($results['events'], array(
                'post_type' => get_post_type(),
                'title' => get_the_title(),
                'permalink' => get_the_permalink(),
                'date' => array(
                    'month' => $eventDate->format('M'),
                    'day' => $eventDate->format('d'),
                    'year' => $eventDate->format('Y'),
                ),
                'desc' => $description,
            )
            );
        }
        ;
        if (get_post_type() === 'campus') {
            array_push($results['campuses'], array(
                'post_type' => get_post_type(),
                'title' => get_the_title(),
                'permalink' => get_the_permalink())
            );
        }
        ;

    }
    ;
    if ($results['programs']) {$programsMetaQuery = array('relation' => 'OR');
        foreach ($results['programs'] as $item) {
            array_push($programsMetaQuery, array(
                'key' => 'related_programs',
                'compare' => 'LIKE',
                'value' => '"' . $item['id'] . '"',
            ));
        }
        ;
        $programRelationshipQuery = new WP_Query(array(
            'post_type' => array('professor', 'event'),
            'meta_query' => $programsMetaQuery,
        ));

        while ($programRelationshipQuery->have_posts()) {
            $programRelationshipQuery->the_post();
            if (get_post_type() === 'event') {
                $eventDate = new DateTime(get_field('event_date'));
                $description = null;
                if (!has_excerpt()) {
                    $description = wp_trim_words(get_the_content(), 18);
                } else { $description = get_the_excerpt();}
                array_push($results['events'], array(
                    'post_type' => get_post_type(),
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink(),
                    'date' => array(
                        'month' => $eventDate->format('M'),
                        'day' => $eventDate->format('d'),
                        'year' => $eventDate->format('Y'),
                    ),
                    'desc' => $description,
                )
                );
            }
            ;
            if (get_post_type() === 'professor') {
                array_push($results['professors'], array(
                    'post_type' => get_post_type(),
                    'title' => get_the_title(),
                    'permalink' => get_the_permalink(),
                    'img' => array(
                        'url' => get_the_post_thumbnail_url(0, 'professorLandscape'),
                        'alt' => get_post_meta(get_post_thumbnail_id(), '_wp_attachment_image_alt', true),
                    ))
                );
            }}
        ;
        $results['professors'] = array_values(array_unique($results['professors'], SORT_REGULAR));
        $results['events'] = array_values(array_unique($results['events'], SORT_REGULAR));}

    return $results;
}
;
