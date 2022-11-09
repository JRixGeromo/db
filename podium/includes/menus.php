<?php

// Create a option page for settings
add_action('admin_menu', 'add_podium_option_page');

// Add top-level admin bar link
add_action('admin_bar_menu', 'add_podium_link_to_admin_bar', 999);

// Adds podium link to top-level admin bar
function add_podium_link_to_admin_bar()
{
  global $wp_version;
  global $wp_admin_bar;

  $podium_icon = '<img src="' .podium_4f050d29b8BB9_PATH . './assets/podium.png' . '">';

  $args = array(
    'id' => 'podium-admin-menu',
    'title' => '<span class="ab-icon" ' . ($wp_version < 3.8 && !is_plugin_active('mp6/mp6.php') ? ' style="margin-top: 3px;"' : '') . '>'. '</span><span class="ab-label">Podium</span>', // alter the title of existing node
    'parent' => FALSE,   // set parent to false to make it a top level (parent) node
    'href' => get_bloginfo('wpurl') . '/wp-admin/admin.php?page=menus.php',
    'meta' => array('title' => 'Podium Webchat')
  );

  $wp_admin_bar->add_node($args);
}

// Hook in the options page functionå
function add_podium_option_page()
{
  add_options_page('podium Options', 'podium', 'activate_plugins', basename(__FILE__), 'podium_options_page');
}

?>
