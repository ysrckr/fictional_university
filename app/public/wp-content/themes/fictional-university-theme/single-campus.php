<?php
get_header();

while (have_posts()) {
    the_post();
    pageBanner();
    ?>

    <div class="container container--narrow page-section">
       <div class="metabox metabox--position-up metabox--with-home-link">
                <p>
                    <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('campus') ?>"><i class="fa fa-home" aria-hidden="true"></i> Campuses</a> <span class="metabox__main"><?php the_title()?></span>
                </p>
            </div>
        <div class="generic-content">
            <?php the_content()?>
        </div>

        <div class="acf-map">
        <?php
$mapLocation = get_field('map_location');
    $campusLat = $mapLocation['lat'];
    $campusLng = $mapLocation['lng'];
    ?>
    <div class="marker" data-lat="<?php echo $campusLat ?>" data-lng="<?php echo $campusLng ?>">
        <h3><?php the_title();?></h3>
        <?php echo $mapLocation['address'] ?>
</div>
</div>
         <?php
//Related Programs
    $relatedPrograms = new WP_Query([
        'post_type' => 'program',
        'posts_per_page' => -1,
        'orderby' => 'title',
        'order' => 'ASC',
        'meta_query' => [
            [
                'key' => 'related_campus',
                'compare' => 'LIKE',
                'value' => '"' . get_the_ID() . '"',
            ],
        ],
    ]);
    if ($relatedPrograms->have_posts()) {

        echo '<ul class="min-list link-list">';
        echo '<hr class="section-break">';
        echo '<h2 class="headline headline--medium">Programs Available At This Campus</h2>';
        while ($relatedPrograms->have_posts()) {
            $relatedPrograms->the_post();
            ?>

                <li ><a href="<?php the_permalink()?>"><?php the_title();?></a></li>
            <?php }

        echo '</ul>';

    }
    wp_reset_postdata();
    ?>
    </div>
    <?php
}
get_footer();