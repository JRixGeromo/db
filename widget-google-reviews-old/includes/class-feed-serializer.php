<?php

namespace WP_Rplg_Google_Reviews\Includes;

class Feed_Serializer {

    public function __construct() {
        add_action('admin_post_' . Post_Types::FEED_POST_TYPE . '_save', array($this, 'feed_save'), 30);
    }

    public function feed_save() {

        $raw_data_array = wp_unslash($_POST[Post_Types::FEED_POST_TYPE]);

        $post_id = wp_insert_post(array(
            'ID'           => $raw_data_array['post_id'],
            'post_title'   => $raw_data_array['title'],
            'post_content' => $raw_data_array['content'],
            'post_type'    => Post_Types::FEED_POST_TYPE,
            'post_status'  => 'publish',
        ));

        // NOT: $referer = empty(wp_get_referer()) ? $raw_data_array['current_url'] : wp_get_referer();
        // COZ: Fatal error: Can't use function return value in write context in .../includes/class-feed-serializer.php on line ...
        $referer = wp_get_referer();
        $referer = empty($referer) ? $raw_data_array['current_url'] : wp_get_referer();

        wp_safe_redirect(
            add_query_arg(array(
                Post_Types::FEED_POST_TYPE . '_id' => $post_id,
            ), $referer)
        );
        exit;
    }

}
