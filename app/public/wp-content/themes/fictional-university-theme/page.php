<?php
get_header();
while (have_posts()) {
    the_post();
    pageBanner();
    ?>


    <div class="container container--narrow page-section">
        <?php
$theParentId = wp_get_post_parent_id(get_the_ID());
    if ($theParentId) {
        ?>
            <div class="metabox metabox--position-up metabox--with-home-link">
                <p>
                    <a class="metabox__blog-home-link" href="<?php echo get_permalink($theParentId) ?>"><i class="fa fa-home" aria-hidden="true"></i> Back to <?php echo get_the_title($theParentId); ?></a> <span class="metabox__main"><?php the_title();?></span>
                </p>
            </div><?php
}
    $isParent = get_pages(
        ['child_of' => get_the_ID()]
    );

    if ($theParentId or $isParent) {?>
            <div class="page-links">
                <h2 class="page-links__title"><a href="<?php echo get_permalink($theParentId) ?>"><?php echo get_the_title($theParentId); ?></a></h2>
                <ul class="min-list">
                    <?php
$findChildrenOf = $theParentId;
        if (!$theParentId) {
            $findChildrenOf = get_the_ID();
        }
        wp_list_pages(array(
            'title_li' => null,
            'child_of' => $findChildrenOf,
            'sort_column' => 'menu_order',
        ));?>
                </ul>
            </div>
        <?php
}
    ?>


        <div class="generic-content">
            <?php the_content();?>
        </div>
    </div>
<?php
}
get_footer();
