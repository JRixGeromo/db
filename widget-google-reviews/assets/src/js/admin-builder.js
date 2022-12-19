var GRW_HTML_CONTENT = '' +

    '<div class="grw-builder-platforms grw-builder-inside">' +

        '<div class="grw-toggle grw-builder-connect grw-connect-google">Connect Google</div>' +
        '<div class="grw-connect-google-inside" style="display:none">' +
            '<div class="grw-builder-option">' +
                '<input type="text" class="grw-connect-id" value="" placeholder="Place ID" />' +
                '<span class="grw-quest grw-toggle" title="Click to help">?</span>' +
                '<div class="grw-quest-help">' +
                    'The standard way to find your Google Place ID is to go to ' +
                    '<a href="https://developers.google.com/places/place-id" target="_blank">https://developers.google.com/places/place-id</a> ' +
                    'and search for your company name.<br><br>But sometimes it may not work, in this case please see ' +
                    '<a href="' + GRW_VARS.supportUrl + '&grw_tab=fig#place_id" target="_blank">how to find any Google Place ID</a>.' +
                '</div>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<select class="grw-connect-lang">' +
                    '<option value="" selected="selected">Choose language if required</option>' +
                    '<option value="ar">Arabic</option>' +
                    '<option value="bg">Bulgarian</option>' +
                    '<option value="bn">Bengali</option>' +
                    '<option value="ca">Catalan</option>' +
                    '<option value="cs">Czech</option>' +
                    '<option value="da">Danish</option>' +
                    '<option value="de">German</option>' +
                    '<option value="el">Greek</option>' +
                    '<option value="en">English</option>' +
                    '<option value="es">Spanish</option>' +
                    '<option value="eu">Basque</option>' +
                    '<option value="eu">Basque</option>' +
                    '<option value="fa">Farsi</option>' +
                    '<option value="fi">Finnish</option>' +
                    '<option value="fil">Filipino</option>' +
                    '<option value="fr">French</option>' +
                    '<option value="gl">Galician</option>' +
                    '<option value="gu">Gujarati</option>' +
                    '<option value="hi">Hindi</option>' +
                    '<option value="hr">Croatian</option>' +
                    '<option value="hu">Hungarian</option>' +
                    '<option value="id">Indonesian</option>' +
                    '<option value="it">Italian</option>' +
                    '<option value="iw">Hebrew</option>' +
                    '<option value="ja">Japanese</option>' +
                    '<option value="kn">Kannada</option>' +
                    '<option value="ko">Korean</option>' +
                    '<option value="lt">Lithuanian</option>' +
                    '<option value="lv">Latvian</option>' +
                    '<option value="ml">Malayalam</option>' +
                    '<option value="mr">Marathi</option>' +
                    '<option value="nl">Dutch</option>' +
                    '<option value="no">Norwegian</option>' +
                    '<option value="pl">Polish</option>' +
                    '<option value="pt">Portuguese</option>' +
                    '<option value="pt-BR">Portuguese (Brazil)</option>' +
                    '<option value="pt-PT">Portuguese (Portugal)</option>' +
                    '<option value="ro">Romanian</option>' +
                    '<option value="ru">Russian</option>' +
                    '<option value="sk">Slovak</option>' +
                    '<option value="sl">Slovenian</option>' +
                    '<option value="sr">Serbian</option>' +
                    '<option value="sv">Swedish</option>' +
                    '<option value="ta">Tamil</option>' +
                    '<option value="te">Telugu</option>' +
                    '<option value="th">Thai</option>' +
                    '<option value="tl">Tagalog</option>' +
                    '<option value="tr">Turkish</option>' +
                    '<option value="uk">Ukrainian</option>' +
                    '<option value="vi">Vietnamese</option>' +
                    '<option value="zh">Chinese (Simplified)</option>' +
                    '<option value="zh-Hant">Chinese (Traditional)</option>' +
                '</select>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<button class="grw-connect-btn">Connect Google</button>' +
                '<small class="grw-connect-error"></small>' +
            '</div>' +
        '</div>' +

        '<div class="grw-connections"></div>' +

    '</div>' +

    '<div class="grw-connect-options">' +

        '<div class="grw-builder-inside">' +

            '<div class="grw-builder-option">' +
                'Layout' +
                '<select id="view_mode" name="view_mode">' +
                    '<option value="slider" selected="selected">Slider</option>' +
                    '<option value="list">List</option>' +
                '</select>' +
            '</div>' +

        '</div>' +

        /* Common Options */
        '<div class="grw-builder-top grw-toggle">Common Options</div>' +
        '<div class="grw-builder-inside" style="display:none">' +
            '<div class="grw-builder-option">' +
                'Pagination' +
                '<input type="text" name="pagination" value="">' +
            '</div>' +
            '<div class="grw-builder-option">' +
                'Maximum characters before \'read more\' link' +
                '<input type="text" name="text_size" value="">' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="hide_based_on" value="">' +
                    'Hide \'Based on ... reviews\'' +
                '</label>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="hide_writereview" value="">' +
                    'Hide \'review us on G\' button' +
                '</label>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="header_hide_social" value="">' +
                    'Hide rating header, leave only reviews' +
                '</label>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="hide_reviews" value="">' +
                    'Hide reviews, leave only rating header' +
                '</label>' +
            '</div>' +
        '</div>' +

        /* Slider Options */
        '<div class="grw-builder-top grw-toggle">Slider Options</div>' +
        '<div class="grw-builder-inside" style="display:none">' +
            '<div class="grw-builder-option">' +
                'Speed in second' +
                '<input type="text" name="slider_speed" value="" placeholder="Default: 5">' +
            '</div>' +
            '<div class="grw-builder-option">' +
                'Text height' +
                '<input type="text" name="slider_text_height" value="" placeholder="Default: 100px">' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="slider_hide_border" value="">' +
                    'Hide background' +
                '</label>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="slider_hide_prevnext" value="">' +
                    'Hide prev & next buttons' +
                '</label>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="slider_hide_dots" value="">' +
                    'Hide dots' +
                '</label>' +
            '</div>' +
        '</div>' +

        /* Style Options */
        '<div class="grw-builder-top grw-toggle">Style Options</div>' +
        '<div class="grw-builder-inside" style="display:none">' +
            '<div class="grw-builder-option">' +
                'Container max-width' +
                '<input type="text" name="max_width" value="" placeholder="for instance: 300px">' +
            '</div>' +
            '<div class="grw-builder-option">' +
                'Container max-height' +
                '<input type="text" name="max_height" value="" placeholder="for instance: 500px">' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="centered" value="">' +
                    'Place by center (only if max-width is set)' +
                '</label>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="dark_theme">' +
                    'Dark background' +
                '</label>' +
            '</div>' +
        '</div>' +

        /* Advance Options */
        '<div class="grw-builder-top grw-toggle">Advance Options</div>' +
        '<div class="grw-builder-inside" style="display:none">' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="lazy_load_img" checked>' +
                    'Lazy load images' +
                '</label>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="google_def_rev_link">' +
                    'Use default Google reviews link' +
                '</label>' +
                '<span class="grw-quest grw-quest-top grw-toggle" title="Click to help">?</span>' +
                '<div class="grw-quest-help" style="display:none;">If the direct link to all reviews <b>https://search.google.com/local/reviews?placeid=&lt;PLACE_ID&gt;</b> does not work with your Google place (leads to 404), please use this option to use the default reviews link to Google map.</div>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="open_link" checked>' +
                    'Open links in new Window' +
                '</label>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="nofollow_link" checked>' +
                    'Use no follow links' +
                '</label>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                'Reviewer avatar size' +
                '<select name="reviewer_avatar_size">' +
                    '<option value="56" selected="selected">Small: 56px</option>' +
                    '<option value="128">Medium: 128px</option>' +
                    '<option value="256">Large: 256px</option>' +
                '</select>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                'Cache data' +
                '<select name="cache">' +
                    '<option value="1">1 Hour</option>' +
                    '<option value="3">3 Hours</option>' +
                    '<option value="6">6 Hours</option>' +
                    '<option value="12" selected="selected">12 Hours</option>' +
                    '<option value="24">1 Day</option>' +
                    '<option value="48">2 Days</option>' +
                    '<option value="168">1 Week</option>' +
                    '<option value="">Disable (NOT recommended)</option>' +
                '</select>' +
            '</div>' +
            '<div class="grw-builder-option">' +
                'Reviews limit' +
                '<input type="text" name="reviews_limit" value="">' +
            '</div>' +
        '</div>' +

    '</div>';

function grw_builder_init($, data) {

    var el = document.querySelector(data.el);
    if (!el) return;

    el.innerHTML = GRW_HTML_CONTENT;

    var connect_google_el = el.querySelector('.grw-connect-google-inside'),
        google_pid_el = el.querySelector('.grw-connect-id');

    if (data.conns) {
        grw_deserialize_connections($, el, data.conns, data.opts);
    } else {
        connect_google_el.style = '';
        google_pid_el.focus();
    }

    // Google Connect
    grw_connection($, connect_google_el, 'google', data.authcode);

    $('.grw-connect-options input[type="text"],.grw-connect-options textarea').keyup(function() {
        grw_serialize_connections();
    });
    $('.grw-connect-options input[type="checkbox"],.grw-connect-options select').change(function() {
        grw_serialize_connections();
    });

    $('.grw-toggle', el).unbind('click').click(function () {
        $(this).toggleClass('toggled');
        $(this).next().slideToggle();
    });

    $('.grw-toggle.grw-connect-google').click(function () {
        google_pid_el.focus();
    });

    if ($('.grw-connections').sortable) {
        $('.grw-connections').sortable({
            stop: function(event, ui) {
                grw_serialize_connections();
            }
        });
        $('.grw-connections').disableSelection();
    }

    $('.wp-review-hide').click(function() {
        grw_review_hide($(this));
        return false;
    });

    $('#grw_save').click(function() {
        grw_feed_save_ajax();
        return false;
    });
}

function grw_feed_save_ajax($) {
    if (!window.grw_title.value) {
        window.grw_title.focus();
        return false;
    }

    window.grw_save.innerText = 'Auto save, wait';
    window.grw_save.disabled = true;

    jQuery.post(ajaxurl, {

        post_id   : window.grw_post_id.value,
        title     : window.grw_title.value,
        content   : document.getElementById('grw-builder-connection').value,
        action    : 'grw_feed_save_ajax',
        grw_nonce : jQuery('#grw_nonce').val()

    }, function(res) {

        var wpgr = document.querySelectorAll('.wp-gr');
        for (var i = 0; i < wpgr.length; i++) {
            wpgr[i].parentNode.removeChild(wpgr[i]);
        }

        window.grw_collection_preview.innerHTML = res;

        jQuery('.wp-review-hide').unbind('click').click(function() {
            grw_review_hide(jQuery(this));
            return false;
        });

        if (!window.grw_post_id.value) {
            var post_id = document.querySelector('.wp-gr').getAttribute('data-id');
            window.grw_post_id.value = post_id;
            window.location.href = window.location.href + '&grw_feed_id=' + post_id;
        }

        window.grw_save.innerText = 'Save & Refresh';
        window.grw_save.disabled = false;
    });
}

function grw_feed_save() {
    if (!window.grw_title.value) {
        window.grw_title.focus();
        return false;
    }

    var content = document.getElementById('grw-builder-connection').value;
    if (content) {
        var json = JSON.parse(content)
        if (json) {
            if (json.connections && json.connections.length) {
                return true;
            }
        }
    }

    alert("Please click 'CONNECT GOOGLE' and connect your Google reviews then save this widget");
    return false;
}

function grw_review_hide($this) {
    jQuery.post(GRW_VARS.handlerUrl + '&cf_action=grw_hide_review', {
        id          : $this.attr('data-id'),
        feed_id     : jQuery('input[name="grw_feed[post_id]"]').val(),
        grw_wpnonce : jQuery('#grw_nonce').val()
    }, function(res) {
        var parent = $this.parent().parent();
        if (res.hide) {
            $this.text('show review');
            parent.addClass('wp-review-hidden');
        } else {
            $this.text('hide review');
            parent.removeClass('wp-review-hidden');
        }
    }, 'json');
}

function grw_connection($, el, platform, authcode) {
    var connect_btn = el.querySelector('.grw-connect-btn');
    $(connect_btn).click(function() {

        var connect_id_el = el.querySelector('.grw-connect-id');
            //connect_key_el = el.querySelector('.grw-connect-key');

        if (!connect_id_el.value) {
            connect_id_el.focus();
            return false;
        }/* else if (!connect_key_el.value) {
            connect_key_el.focus();
            return false;
        }*/

        var id = (platform == 'yelp' ? /.+\/biz\/(.*?)(\?|\/|$)/.exec(connect_id_el.value)[1] : connect_id_el.value),
            lang = el.querySelector('.grw-connect-lang').value;
            //key = connect_key_el.value;

        connect_btn.innerHTML = 'Please wait...';
        connect_btn.disabled = true;

        grw_connect_ajax($, el, {id: id, lang: lang}, platform, authcode, 1);
        return false;
    });
}

function grw_connect_ajax($, el, params, platform, authcode, attempt) {

    var connect_btn = el.querySelector('.grw-connect-btn'),
        url = GRW_VARS.handlerUrl + '&cf_action=grw_connect_' + platform + '&v=' + new Date().getTime();

    $.post(url, {
        id: decodeURIComponent(params.id),
        lang: params.lang,
        //key: key,
        grw_wpnonce: $('#grw_nonce').val()
    }, function(res) {

        console.log('grw_connect_debug:', res);

        connect_btn.innerHTML = 'Connect ' + (platform.charAt(0).toUpperCase() + platform.slice(1));
        connect_btn.disabled = false;

        var error_el = el.querySelector('.grw-connect-error');

        if (res.status == 'success') {

            error_el.innerHTML = '';

            var connection_params = {
                id       : res.result.id,
                lang     : params.lang,
                name     : res.result.name,
                photo    : res.result.photo,
                refresh  : true,
                platform : platform,
                props    : {
                    default_photo : res.result.photo
                }
            };

            grw_connection_add($, el, connection_params);
            grw_serialize_connections();

        } else {

            switch (res.result.error_message) {

                case 'usage_limit':
                    $('#dialog').dialog({width: '50%', maxWidth: '600px'});
                    break;

                case 'bot_check':
                    if (attempt > 1) {
                        return;
                    }
                    grw_popup('https://gpaw.widgetpack.com/botcheck?authcode=' + authcode, 640, 480, function() {
                        grw_connect_ajax($, el, params, platform, authcode, attempt + 1);
                    });
                    break;

                default:
                    if (res.result.error_message.indexOf('The provided Place ID is no longer valid') >= 0) {
                        error_el.innerHTML = 'It seems Google place which you are trying to connect ' +
                            'does not have a physical address (it\'s virtual or service area), ' +
                            'unfortunately, Google Places API does not support such locations, it\'s a limitation of Google, not the plugin.<br><br>' +
                            'However, you can try to connect your Google reviews in our new cloud service ' +
                            '<a href="https://trust.reviews" target="_blank">Trust.Reviews</a> ' +
                            'and show it on your WordPress site through universal <b>HTML/JavaScript</b> code.';
                    } else {
                        error_el.innerHTML = '<b>Error</b>: ' + res.result.error_message;
                    }
            }
        }

    }, 'json');
}

function grw_connection_add($, el, conn, checked) {

    var connected_id = 'grw-' + conn.platform + '-' + conn.id.replace(/\//g, '');
    if (conn.lang != null) {
        connected_id += conn.lang;
    }

    var connected_el = $('#' + connected_id);

    if (!connected_el.length) {
        connected_el = $('<div class="grw-connection"></div>')[0];
        connected_el.id = connected_id;
        if (conn.lang != undefined) {
            connected_el.setAttribute('data-lang', conn.lang);
        }
        connected_el.setAttribute('data-platform', conn.platform);
        connected_el.innerHTML = grw_connection_render(conn, checked);

        var connections_el = $('.grw-connections')[0];
        connections_el.appendChild(connected_el);

        jQuery('.grw-toggle', connected_el).unbind('click').click(function () {
            jQuery(this).toggleClass('toggled');
            jQuery(this).next().slideToggle();
        });

        var file_frame;
        jQuery('.grw-connect-photo-change', connected_el).on('click', function(e) {
            e.preventDefault();
            grw_upload_photo(connected_el, file_frame, function() {
                grw_serialize_connections();
            });
            return false;
        });

        jQuery('.grw-connect-photo-default', connected_el).on('click', function(e) {
            grw_change_photo(connected_el, conn.props.default_photo);
            grw_serialize_connections();
            return false;
        });

        $('input[type="text"]', connected_el).keyup(function() {
            grw_serialize_connections();
        });

        $('input[type="checkbox"]', connected_el).click(function() {
            grw_serialize_connections();
        });

        $('.grw-connect-delete', connected_el).click(function() {
            if (confirm('Are you sure to delete this business?')) {
                if (!GRW_VARS.wordpress) {
                    var id = connected_el.querySelector('input[name="id"]').value,
                        deleted = window.connections_delete.value;
                    window.connections_delete.value += (deleted ? ',' + id : id);
                }
                $(connected_el).remove();
                grw_serialize_connections();
            }
            return false;
        });
    }
}

function grw_connection_render(conn, checked) {
    var name = conn.name;
    if (conn.lang) {
        name += ' (' + conn.lang + ')';
    }

    conn.photo = conn.photo || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

    var option = document.createElement('option');
    if (conn.platform == 'google' && conn.props && conn.props.place_id) {
        option.value = conn.props.place_id;
    } else {
        option.value = conn.id;
    }
    option.text = grw_capitalize(conn.platform) + ': ' + conn.name;

    return '' +
        '<div class="grw-toggle grw-builder-connect grw-connect-business">' +
            '<input type="checkbox" class="grw-connect-select" onclick="event.stopPropagation();" ' + (checked?'checked':'') + ' /> ' +
            name + (conn.address ? ' (' + conn.address + ')' : '') +
        '</div>' +
        '<div style="display:none">' +
            (function(props) {
                var result = '';
                for (prop in props) {
                    if (prop != 'platform' && Object.prototype.hasOwnProperty.call(props, prop)) {
                        result += '<input type="hidden" name="' + prop + '" value="' + props[prop] + '" class="grw-connect-prop" readonly />';
                    }
                }
                return result;
            })(conn.props) +
            '<input type="hidden" name="id" value="' + conn.id + '" readonly />' +
            (conn.address ? '<input type="hidden" name="address" value="' + conn.address + '" readonly />' : '') +
            (conn.access_token ? '<input type="hidden" name="access_token" value="' + conn.access_token + '" readonly />' : '') +
            '<div class="grw-builder-option">' +
                '<img src="' + conn.photo + '" alt="' + conn.name + '" class="grw-connect-photo">' +
                '<a href="#" class="grw-connect-photo-change">Change</a>' +
                '<a href="#" class="grw-connect-photo-default">Default</a>' +
                '<input type="hidden" name="photo" class="grw-connect-photo-hidden" value="' + conn.photo + '" tabindex="2"/>' +
                '<input type="file" tabindex="-1" accept="image/*" onchange="grw_upload_image(this.parentNode, this.files)" style="display:none!important">' +
            '</div>' +
            '<div class="grw-builder-option">' +
                '<input type="text" name="name" value="' + conn.name + '" />' +
            '</div>' +
            (conn.website != undefined ?
            '<div class="grw-builder-option">' +
                '<input type="text" name="website" value="' + conn.website + '" />' +
            '</div>'
            : '' ) +
            (conn.lang != undefined ?
            '<div class="grw-builder-option">' +
                '<input type="text" name="lang" value="' + conn.lang + '" placeholder="Default language (English)" readonly />' +
            '</div>'
            : '' ) +
            (conn.review_count != undefined ?
            '<div class="grw-builder-option">' +
                '<input type="text" name="review_count" value="' + conn.review_count + '" placeholder="Total number of reviews" />' +
                '<span class="grw-quest grw-toggle" title="Click to help">?</span>' +
                '<div class="grw-quest-help">Google return only 5 most helpful reviews and does not return information about total number of reviews and you can type here it manually.</div>' +
            '</div>'
            : '' ) +
            (conn.refresh != undefined ?
            '<div class="grw-builder-option">' +
                '<label>' +
                    '<input type="checkbox" name="refresh" ' + (conn.refresh ? 'checked' : '') + '> Refresh reviews' +
                '</label>' +
                '<span class="grw-quest grw-quest-top grw-toggle" title="Click to help">?</span>' +
                '<div class="grw-quest-help">' +
                    (conn.platform == 'google' ? 'The plugin uses the Google Places API to get your reviews. <b>The API only returns the 5 most helpful reviews (it\'s a limitation of Google, not the plugin)</b>. This option calls the Places API once in 24 hours (to keep the plugin\'s free and avoid a Google Billing) to check for a new reviews and if there are, adds to the plugin. Thus slowly building up a database of reviews.<br><br>Also if you see the new reviews on Google map, but after some time it\'s not added to the plugin, it means that Google does not include these reviews to the API and the plugin can\'t get this.<br><br>If you need to show <b>all reviews</b>, please use <a href="https://richplugins.com/business-reviews-bundle-wordpress-plugin" target="_blank">the Business plugin</a> which uses a Google My Business API without API key and billing.' : '') +
                    (conn.platform == 'yelp' ? 'The plugin uses the Yelp API to get your reviews. <b>The API only returns the 3 most helpful reviews without sorting possibility.</b> When Yelp changes the 3 most helpful the plugin will automatically add the new one to your database. Thus slowly building up a database of reviews.' : '') +
                '</div>' +
            '</div>'
            : '' ) +
            '<div class="grw-builder-option">' +
                '<button class="grw-connect-delete">Delete business</button>' +
            '</div>' +
        '</div>';
}

function grw_serialize_connections() {

    var connections = [],
        connections_el = document.querySelectorAll('.grw-connection');

    for (var i in connections_el) {
        if (Object.prototype.hasOwnProperty.call(connections_el, i)) {

            var select_el = connections_el[i].querySelector('.grw-connect-select');
            if (select_el && !grw_is_hidden(select_el) && !select_el.checked) {
                continue;
            }

            var connection = {},
                lang       = connections_el[i].getAttribute('data-lang'),
                platform   = connections_el[i].getAttribute('data-platform'),
                inputs     = connections_el[i].querySelectorAll('input');

            //connections[platform] = connections[platform] || [];

            if (lang != undefined) {
                connection.lang = lang;
            }

            for (var j in inputs) {
                if (Object.prototype.hasOwnProperty.call(inputs, j)) {
                    var input = inputs[j],
                        name = input.getAttribute('name');

                    if (!name) continue;

                    if (input.className == 'grw-connect-prop') {
                        connection.props = connection.props || {};
                        connection.props[name] = input.value;
                    } else {
                        connection[name] = (input.type == 'checkbox' ? input.checked : input.value);
                    }
                }
            }
            connection.platform = platform;
            connections.push(connection);
        }
    }

    var options = {},
        options_el = document.querySelector('.grw-connect-options').querySelectorAll('input[name],select,textarea');

    for (var o in options_el) {
        if (Object.prototype.hasOwnProperty.call(options_el, o)) {
            var input = options_el[o],
                name  = input.getAttribute('name');

            if (input.type == 'checkbox') {
                options[name] = input.checked;
            } else if (input.value != undefined) {
                options[name] = (input.type == 'textarea' || name == 'word_filter' || name == 'word_exclude' ? encodeURIComponent(input.value) : input.value);
            }
        }
    }

    if (GRW_VARS.wordpress) {
        document.getElementById('grw-builder-connection').value = JSON.stringify({connections: connections, options: options});
    } else {
        document.getElementById('grw-builder-connections').value = JSON.stringify(connections);
        document.getElementById('grw-builder-options').value = JSON.stringify(options);
    }

    if (connections.length) {
        var first = connections[0],
            title = window.grw_title.value;

        if (!title) {
            window.grw_title.value = first.name;
        }
        grw_feed_save_ajax();
    }
}

function grw_deserialize_connections($, el, connections, options) {
    if (GRW_VARS.wordpress) {
        options = connections.options;
        if (Array.isArray(connections.connections)) {
            connections = connections.connections;
        } else {
            var temp_conns = [];
            if (Array.isArray(connections.google)) {
                for (var c = 0; c < connections.google.length; c++) {
                    connections.google[c].platform = 'google';
                }
                temp_conns = temp_conns.concat(connections.google);
            }
            if (Array.isArray(connections.facebook)) {
                for (var c = 0; c < connections.facebook.length; c++) {
                    connections.facebook[c].platform = 'facebook';
                }
                temp_conns = temp_conns.concat(connections.facebook);
            }
            if (Array.isArray(connections.yelp)) {
                for (var c = 0; c < connections.yelp.length; c++) {
                    connections.yelp[c].platform = 'yelp';
                }
                temp_conns = temp_conns.concat(connections.yelp);
            }
            connections = temp_conns;
        }
    } else {
        connections = JSON.parse(connections);
        options = JSON.parse(options);
    }

    for (var i = 0; i < connections.length; i++) {
        grw_connection_add($, el.querySelector('.grw-builder-platforms'), connections[i], true);
    }

    for (var opt in options) {
        if (Object.prototype.hasOwnProperty.call(options, opt)) {
            var control = el.querySelector('input[name="' + opt + '"],select[name="' + opt + '"],textarea[name="' + opt + '"]');
            if (control) {
                var name = control.getAttribute('name');
                if (typeof(options[opt]) === 'boolean') {
                    control.checked = options[opt];
                } else {
                    control.value = (control.type == 'textarea' || name == 'word_filter' || name == 'word_exclude' ? decodeURIComponent(options[opt]) : options[opt]);
                    if (opt.indexOf('_photo') > -1 && control.value) {
                        control.parentNode.querySelector('img').src = control.value;
                    }
                }
            }
        }
    }
}

function grw_upload_photo(el, file_frame, cb) {
    if (GRW_VARS.wordpress) {
        if (file_frame) {
            file_frame.open();
            return;
        }

        file_frame = wp.media.frames.file_frame = wp.media({
            title: jQuery(this).data('uploader_title'),
            button: {text: jQuery(this).data('uploader_button_text')},
            multiple: false
        });

        file_frame.on('select', function() {
            var attachment = file_frame.state().get('selection').first().toJSON();
            grw_change_photo(el, attachment.url);
            cb && cb(attachment.url);
        });
        file_frame.open();
    } else {
        el.querySelector('input[type="file"]').click();
        return false;
    }
}

function grw_upload_image(el, files) {
    var formData = new FormData();
    for (var i = 0, file; file = files[i]; ++i) {
        formData.append('file', file);
    }

    var handler = this;

    if (!this.xhr) {
        this.xhr = new XMLHttpRequest();
    }
    this.xhr.open('POST', 'https://media.cackle.me/upload2', true);
    this.xhr.onload = function(e) {
        if (4 === handler.xhr.readyState) {
            if (200 === handler.xhr.status && handler.xhr.responseText.length > 0) {
                var img = 'https://media.cackle.me/' + handler.xhr.responseText;
                grw_change_photo(el, img);
            }
        }
    };
    this.xhr.send(formData);
}

function grw_change_photo(el, photo_url) {
    var place_photo_hidden = jQuery('.grw-connect-photo-hidden', el),
        place_photo_img = jQuery('.grw-connect-photo', el);

    place_photo_hidden.val(photo_url);
    place_photo_img.attr('src', photo_url);
    place_photo_img.show();

    grw_serialize_connections();
}

function grw_popup(url, width, height, cb) {
    var top = top || (screen.height/2)-(height/2),
        left = left || (screen.width/2)-(width/2),
        win = window.open(url, '', 'location=1,status=1,resizable=yes,width='+width+',height='+height+',top='+top+',left='+left);
    function check() {
        if (!win || win.closed != false) {
            cb();
        } else {
            setTimeout(check, 100);
        }
    }
    setTimeout(check, 100);
}

function grw_randstr(len) {
   var result = '',
       chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
       charsLen = chars.length;
   for ( var i = 0; i < len; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charsLen));
   }
   return result;
}

function grw_is_hidden(el) {
    return el.offsetParent === null;
}

function grw_capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}