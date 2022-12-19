<?php

namespace WP_Rplg_Google_Reviews\Includes;

use WP_Rplg_Google_Reviews\Includes\Core\Core;

class Feed_Serializer_Ajax {

    public function __construct(Feed_Deserializer $feed_deserializer, Core $core, View $view) {
        $this->feed_deserializer = $feed_deserializer;
        $this->core = $core;
        $this->view = $view;

        add_action('wp_ajax_grw_feed_save_ajax', array($this, 'save_ajax'));
    }

    public function save_ajax() {

        $post_id = wp_insert_post(array(
            'ID'           => $_POST['post_id'],
            'post_title'   => $_POST['title'],
            'post_content' => $_POST['content'],
            'post_type'    => Post_Types::FEED_POST_TYPE,
            'post_status'  => 'publish',
        ));

        if (isset($post_id)) {
            $feed = $this->feed_deserializer->get_feed($post_id);

            $data = $this->core->get_reviews($feed, true);
            $businesses = $data['businesses'];
            $reviews = $data['reviews'];
            $options = $data['options'];

            echo $this->view->render($feed->ID, $businesses, $reviews, $options, true);
        }

        wp_die();
    }

}
