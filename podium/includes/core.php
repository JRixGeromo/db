<?php

// Register settings
function podium_register_settings()
{
  register_setting( 'podium_settings_group', 'podium_settings' );
}
add_action( 'admin_init', 'podium_register_settings' );

// Delete options on uninstall
function podium_uninstall()
{
  delete_option( 'podium_settings' );
}
register_uninstall_hook( __FILE__, 'podium_uninstall' );


?>
