jQuery(document).ready((function($){if($(".importfile").each((function(){var e=$(this),t=e.next("label"),n=t.html();e.on("change",(function(e){var o="";this.files&&this.files.length>1?o=(this.getAttribute("data-multiple-caption")||"").replace("{count}",this.files.length):e.target.value&&(o=e.target.value.split("\\").pop()),o?t.find("span").html(o):t.html(n)})),e.on("focus",(function(){e.addClass("has-focus")})).on("blur",(function(){e.removeClass("has-focus")}))})),$("#screen-meta-links").prependTo("#envira-header-temp"),$("#screen-meta").prependTo("#envira-header-temp"),$("#screen-meta-links").css("display","block"),"undefined"!=typeof Clipboard&&$(document).on("click",".envira-clipboard",(function(e){new Clipboard(".envira-clipboard");e.preventDefault()})),$("#envira-config-image-sort").length>0)new Choices("#envira-config-image-sort",{searchChoices:!1,searchEnabled:!1,itemSelectText:"",addItemText:"",shouldSort:!1,shouldSortItems:!1,classNames:{containerInner:"choices__inner sort_inner",containerOuter:"choices sort_inner"}});if($("#envira-config-image-sort-dir").length>0)new Choices("#envira-config-image-sort-dir",{searchChoices:!1,searchEnabled:!1,itemSelectText:"",addItemText:"",classNames:{containerInner:"choices__inner sort_dir",containerOuter:"choices sort_dir"}});$(".widgets-sortables").on("click","div.widget-top",(function(e,t){var n=$(this).parent().attr("id");if(-1!==n.indexOf("envira-album"))var o="envira_widget_get_albums",i="album";else o="envira_widget_get_galleries",i="gallery";var a=$("#"+n+" select.form-control").val();$("#"+n+" select.form-control option:selected").text();if($("#"+n+" select.form-control").find("option").remove(),$("#"+n+" select.form-control").length>0){var r=new Choices("#"+n+" select.form-control",{searchPlaceholderValue:"Search for an "+i,loadingText:"",itemSelectText:""});r.ajax((function(e){fetch(ajaxurl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},body:"action="+o,credentials:"same-origin"}).then((function(t){t.json().then((function(t){e(t.galleries,"gallery_id","gallery_title"),void 0!==a&&r.setValueByChoice(a)}))})).catch((function(e){console.log(e)}))}))}})),$(document).on("widget-updated",(function(e,t){var n=$(t).attr("id");if(-1!==n.indexOf("album"))var o="envira_widget_get_albums",i="album";else o="envira_widget_get_galleries",i="gallery";var a=$("#"+n+" select.form-control").val();$("#"+n+" select.form-control option:selected").text();if($("#"+n+" select.form-control").find("option").remove(),$("#"+n+" select.form-control").length>0){var r=new Choices("#"+n+" select.form-control",{searchPlaceholderValue:"Search for an "+i,loadingText:"",itemSelectText:""});r.ajax((function(e){fetch(ajaxurl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},body:"action="+o,credentials:"same-origin"}).then((function(t){t.json().then((function(t){e(t.galleries,"gallery_id","gallery_title"),void 0!==a&&r.setValueByChoice(a)}))})).catch((function(e){console.log(e)}))}))}})),$(document).on("widget-added",(function(e,t){$(t).attr("id")}))}));