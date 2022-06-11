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


        <div class="generic-content">
            <form method="get" action="<?=esc_url(site_url('/'))?>" class="search-form">
                <label class="headline headline--medium" for="s">Search</label>
               <div class="search-form-row">
               <input type="search" name="s" id="s" class="s" placeholder="What are you looking for?">
                <input type="submit" value="Search" class="search-submit">
               </div>
            </form>
        </div>
    </div>
<?php
}
get_footer();
