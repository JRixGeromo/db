<?php

namespace WP_Rplg_Google_Reviews\Includes;

use WP_Rplg_Google_Reviews\Includes\Core\Core;

class Plugin_Overview_Ajax {

    public function __construct(Core $core) {
        $this->core = $core;

        add_action('wp_ajax_grw_overview_ajax', array($this, 'overview_ajax'));
    }

    public function overview_ajax() {
        $overview = $this->core->get_overview($_POST['place_id']);
        echo json_encode($overview);

        die();
    }
}
