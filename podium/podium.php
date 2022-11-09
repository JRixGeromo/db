<?php
/*
 * Plugin Name: Podium
 * Version: 1.0.6
 * Stable Tag: 1.0.6
 * Description: Allow customers to text you right from your website, capture them as leads, and convert them to customers. Install Podium on your WordPress site in just a few clicks.
 * Author: Podium
 * Author URI: https://www.podium.com/
 */

// Prevent Direct Access
defined('ABSPATH') or die("Restricted access!");

/*
* Define
*/
define('podium_4f050d29b8BB9_VERSION', '1.0.6');
define('podium_4f050d29b8BB9_DIR', plugin_dir_path(__FILE__));
define('podium_4f050d29b8BB9_URL', plugin_dir_url(__FILE__));
defined('podium_4f050d29b8BB9_PATH') or define('podium_4f050d29b8BB9_PATH', untrailingslashit(plugins_url('', __FILE__)));

require_once(podium_4f050d29b8BB9_DIR . 'includes/core.php');
require_once(podium_4f050d29b8BB9_DIR . 'includes/menus.php');
require_once(podium_4f050d29b8BB9_DIR . 'includes/admin.php');
require_once(podium_4f050d29b8BB9_DIR . 'includes/embed.php');


?>
