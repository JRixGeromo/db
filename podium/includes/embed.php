<?php

// Add the podium Javascript
add_action('wp_footer', 'add_podium');


function print_sanatized_script($podium_tag)
{
  $script_dom = new DOMDocument();
  $script_dom->loadHTML('<html>'.$podium_tag.'</html>');
  foreach($script_dom->getElementsByTagName('script') as $script)
  {
    if (strpos(esc_url_raw($script->getAttribute('src')), 'ORG_TOKEN') !== false)
    {
      echo '<script defer src="' . esc_url_raw($script->getAttribute('src')) . '" id="podium-widget" data-organization-api-token="' . esc_attr($script->getAttribute('data-organization-api-token')) . '"></script>';
      echo "\n";
    } 
    else
    {
      echo '<script defer src="' . esc_url_raw($script->getAttribute('src')) . '" id="podium-widget" data-api-token="' . esc_attr($script->getAttribute('data-api-token')) . '" /></script>';
      echo "\n";
    }
  }

}


// The guts of the podium script
function add_podium()
{
  // Ignore admin, feed, robots or trackbacks
  if ( is_feed() || is_robots() || is_trackback() )
  {
    return;
  }

  $options = get_option('podium_settings');

  // If options is empty then exit
  if( empty( $options ) )
  {
    return;
  }

  // Check to see if podium is enabled
  if ( esc_attr( $options['podium_enabled'] ) == "on" )
  {
    $podium_tag = $options['podium_widget_code'];

    // Insert tracker code
    if ( '' != $podium_tag )
    {
      // script tag which will be print in the client website
      echo "<!-- Start: Podium Webchat Code -->\n";
      print_sanatized_script($podium_tag);
      echo "<!-- End: Podium Webchat Code -->\n";


    }
  }
}
?>
