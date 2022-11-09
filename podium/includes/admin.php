<?php

// Output the options page
function podium_options_page()
{
  // Get options
  $options = get_option('podium_settings');

  // Check to see if podium is enabled
  $podium_activated = false;
  if ( esc_attr( $options['podium_enabled'] ) == "on" ) {
    $podium_activated = true;
    wp_cache_flush();
  }


?>
        <div class="wrap">
        <form name="podium-form" action="options.php" method="post" enctype="multipart/form-data">
          <?php settings_fields( 'podium_settings_group' ); ?>

            <h1>Podium Webchat</h1>
            <h3>Basic Options</h3>
            <?php if ( ! $podium_activated ) { ?>
                <div style="margin:10px auto; border:3px #f00 solid; background-color:#fdd; color:#000; padding:10px; text-align:center;">
                Podium Webchat is currently <strong>DISABLED</strong>.
                </div>
            <?php } ?>
            <?php do_settings_sections( 'podium_settings_group' ); ?>

            <table class="form-table" cellspacing="2" cellpadding="5" width="100%">
                <tr>
                    <th width="30%" valign="top" style="padding-top: 10px;">
                        <label for="podium_enabled">Podium Webchat is:</label>
                    </th>
                    <td>
                    <select name="podium_settings[podium_enabled]"  id="podium_enabled">
                      <option <?php echo ($podium_activated) ? esc_html_e('selected="selected"', 'text-domain') : '' ?> value="<?php echo esc_attr('on'); ?>">Enabled</option>
                      <option <?php echo (!$podium_activated) ? esc_html_e('selected="selected"', 'text-domain') : '' ?> value="<?php echo esc_attr('off'); ?>">Disabled</option>
                    </select>
                    </td>
                </tr>
            </table>
                <table class="form-table" cellspacing="2" cellpadding="5" width="100%">
                <tr>
                    <th valign="top" style="padding-top: 10px;">
                        <label for="podium_widget_code">Podium Script:</label>
                    </th>
                    <td>
                      <textarea rows="5" cols="120" placeholder="<!-- Insert the podium script here -->" name="podium_settings[podium_widget_code]"><?php echo esc_attr( $options['podium_widget_code'] ); ?></textarea>
                        <p style="margin: 5px 10px;">Please Enter Your Podium Script Above </p>
                    </td>
                </tr>
                </table>
            <p class="submit">
                <?php echo submit_button('Save Changes'); ?>
            </p>
        </div>
        </form>

<?php
}
?>
