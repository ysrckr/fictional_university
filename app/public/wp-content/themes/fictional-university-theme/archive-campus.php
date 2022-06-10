
<?php
get_header();

pageBanner([
    'title' => 'Campuses',
    'subtitle' => 'All of Our Campuses',
]);
?>

    <div class="container container--narrow page-section">
        <div class="acf-map">
        <?php
while (have_posts()) {
    the_post();
    $mapLocation = get_field('map_location');
    $campusLat = $mapLocation['lat'];
    $campusLng = $mapLocation['lng'];
    ?>
    <div class="marker" data-lat="<?php echo $campusLat ?>" data-lng="<?php echo $campusLng ?>">
        <h3><a href="<?php the_permalink()?>"><?php the_title();?></a></h3>
        <?php echo $mapLocation['address'] ?>
</div>
         <?php
}?>

        </div>
    </div>
<?php

get_footer();?>