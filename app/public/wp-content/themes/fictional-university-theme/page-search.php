<?php
get_header();
while (have_posts()) {
    the_post();
    pageBanner(
        [
            'title' => '',
        ]
    );
    ?>


    <div class="container container--narrow page-section">


<?php
get_search_form();
}
get_footer();
