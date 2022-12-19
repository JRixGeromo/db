<?php

namespace WP_Rplg_Google_Reviews\Includes;

class Assets {

    private $url;
    private $version;
    private $debug;

    private static $css_assets = array(
        'grw-admin-main-css'   => 'css/admin-main',
        'grw-public-clean-css' => 'css/public-clean',
        'grw-public-main-css'  => 'css/public-main',
    );

    private static $js_assets = array(
        'grw-admin-main-js'    => 'js/admin-main',
        'grw-admin-builder-js' => 'js/admin-builder',
        'grw-public-time-js'   => 'js/public-time',
        'grw-public-blazy-js'  => 'js/public-blazy.min',
        'grw-public-main-js'   => 'js/public-main',
    );

    public function __construct($url, $version, $debug) {
        $this->url     = $url;
        $this->version = $version;
        $this->debug  = $debug;
    }

    public function register() {
        if (is_admin()) {
            add_action('admin_enqueue_scripts', array($this, 'register_styles'));
            add_action('admin_enqueue_scripts', array($this, 'register_scripts'));
            add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_styles'));
            add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        } else {
            add_action('wp_enqueue_scripts', array($this, 'register_styles'));
            add_action('wp_enqueue_scripts', array($this, 'register_scripts'));
            $grw_demand_assets = get_option('grw_demand_assets');
            if (!$grw_demand_assets || $grw_demand_assets != 'true') {
                add_action('wp_enqueue_scripts', array($this, 'enqueue_public_styles'));
                add_action('wp_enqueue_scripts', array($this, 'enqueue_public_scripts'));
            }
            add_filter('script_loader_tag', array($this, 'add_async'), 10, 2);
        }
    }

    function add_async($tag, $handle) {
        $js_assets = array(
            'grw-admin-main-js'    => 'js/admin-main',
            'grw-admin-builder-js' => 'js/admin-builder',
            'grw-public-time-js'   => 'js/public-time',
            'grw-public-blazy-js'  => 'js/public-blazy.min',
            'grw-public-main-js'   => 'js/public-main',
        );
        if (isset($handle) && array_key_exists($handle, $js_assets)) {
            return str_replace(' src', ' defer="defer" src', $tag);
        }
        return $tag;
    }

    public function register_styles() {
        $styles = array('grw-admin-main-css', 'grw-public-main-css');
        if ($this->debug) {
            array_push($styles, 'grw-public-clean-css');
        }
        $this->register_styles_loop($styles);
    }

    public function register_scripts() {
        $scripts = array('grw-admin-main-js', 'grw-public-main-js');
        if ($this->debug) {
            array_push($scripts, 'grw-admin-builder-js');
            array_push($scripts, 'grw-public-time-js');
            array_push($scripts, 'grw-public-blazy-js');
        }
        $this->register_scripts_loop($scripts);
    }

    public function enqueue_admin_styles() {
        wp_enqueue_style('wp-jquery-ui-dialog');
        wp_enqueue_style('grw-admin-main-css');
        wp_style_add_data('grw-admin-main-css', 'rtl', 'replace');
        $this->enqueue_public_styles();
    }

    public function enqueue_admin_scripts() {
        wp_enqueue_script('jquery');
        wp_enqueue_script('jquery-ui-core');
        wp_enqueue_script('jquery-ui-draggable');
        wp_enqueue_script('jquery-ui-sortable');
        wp_enqueue_script('jquery-ui-dialog');

        $vars = array(
            'googleAPIKey'  => get_option('grw_google_api_key'),
            'GOOGLE_AVATAR' => GRW_GOOGLE_AVATAR,
            'handlerUrl'    => admin_url('options-general.php?page=grw'),
            'supportUrl'    => admin_url('admin.php?page=grw-support'),
            'actionPrefix'  => 'grw',
            'wordpress'     => true,
        );

        if ($this->debug) {
            wp_localize_script('grw-admin-builder-js', 'GRW_VARS', $vars);
            wp_enqueue_script('grw-admin-builder-js');
        } else {
            wp_localize_script('grw-admin-main-js', 'GRW_VARS', $vars);
        }
        wp_enqueue_script('grw-admin-main-js');

        $this->enqueue_public_scripts();
    }

    public function enqueue_public_styles() {
        if ($this->debug) {
            wp_enqueue_style('grw-public-clean-css');
            wp_style_add_data('grw-public-clean-css', 'rtl', 'replace');
        }
        wp_enqueue_style('grw-public-main-css');
        wp_style_add_data('grw-public-main-css', 'rtl', 'replace');
    }

    public function enqueue_public_scripts() {
        if ($this->debug) {
            wp_enqueue_script('grw-public-time-js');
            wp_enqueue_script('grw-public-blazy-js');
        }
        wp_enqueue_script('grw-public-main-js');
    }

    private function register_styles_loop($styles) {
        foreach ($styles as $style) {
            wp_register_style($style, $this->get_css_asset($style), array(), $this->version);
        }
    }

    private function register_scripts_loop($scripts) {
        foreach ($scripts as $script) {
            wp_register_script($script, $this->get_js_asset($script), array(), $this->version);
        }
    }

    private function get_css_asset($asset) {
        return $this->url . ($this->debug ? 'src/' : '') . self::$css_assets[$asset] . '.css';
    }

    private function get_js_asset($asset) {
        return $this->url . ($this->debug ? 'src/' : '') . self::$js_assets[$asset] . '.js';
    }

}