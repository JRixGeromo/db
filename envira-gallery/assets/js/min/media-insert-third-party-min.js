wp.media.view.EnviraGalleryError=wp.Backbone.View.extend({tagName:"div",className:"notice error envira-gallery-error",render:function(){return this.template=wp.media.template("envira-gallery-error"),this.$el.html(this.template(this.model)),this}}),wp.media.view.EnviraGalleryItem=wp.Backbone.View.extend({tagName:"li",className:"attachment envira-gallery-item",render:function(){return this.template=wp.media.template("envira-gallery-item"),this.$el.html(this.template(this.model.toJSON())),this}}),wp.media.view.Toolbar.EnviraGalleryToolbar=wp.media.view.Toolbar.extend({initialize:function(){_.defaults(this.options,{event:"envira_gallery_insert",close:!1,items:{envira_gallery_insert:{id:"envira-gallery-insert-button",style:"primary",text:wp.media.view.l10n.insertIntoPost,priority:80,requires:!1,click:function(){this.controller.state().insert()}}}}),wp.media.view.Toolbar.prototype.initialize.apply(this,arguments)},refresh:function(){var e=this.controller.state().props;this.get("envira_gallery_insert").model.set("disabled",!e.length),wp.media.view.Toolbar.prototype.refresh.apply(this,arguments)}}),wp.media.view.EnviraGalleryView=wp.media.View.extend({className:"attachments-browser envira-gallery",path:"/",is_loading:!1,events:{"click .envira-gallery-item":"click",keyup:"search",search:"search"},get_action:"",search_action:"",initialize:function(e){this.collection=new Backbone.Collection,this.$el.prepend(wp.media.template("envira-gallery-search-bar")),this.$el.prepend(wp.media.template(e.sidebar_template)),this.$el.prepend(wp.media.template("envira-gallery-items")),this.on("loading",this.loading,this),this.on("loaded",this.loaded,this),this.get_action=e.get_action,this.search_action=e.search_action,this.path=e.path,this.getItems(!1,"")},click:function(e){var t=jQuery(e.currentTarget),i=jQuery("div.attachment-preview",t).attr("data-is-dir"),a=jQuery("div.attachment-preview",t).attr("data-id");"true"==i?(this.path=a,this.getItems(!1,"")):t.hasClass("selected")?this.removeFromSelection(t,a):this.addToSelection(t,a)},search:function(e){if(!this.is_loading){var t=e.target.value;0!=t.length?t.length<3||this.getItems(!0,t):this.getItems(!1,"")}},loading:function(){this.is_loading=!0,this.$el.find(".spinner").addClass("is-active")},loaded:function(e){this.is_loading=!1,this.$el.find(".spinner").removeClass("is-active"),this.$el.find("div.envira-gallery-error").remove(),void 0!==e&&this.$el.find("div.media-toolbar").after(this.renderError(e)),this.controller.toolbar.get().refresh()},clearItems:function(){this.$el.find("ul.envira-gallery-attachments li.attachment.selected").removeClass("selected details"),this.$el.find("ul.envira-gallery-attachments").empty()},getItems:function(e,t){if(!this.is_loading){var i=this;i.trigger("loading"),i.clearItems();var a=e?i.search_action:i.get_action,r={nonce:envira_gallery_media_insert.nonce,path:i.path};e&&(r.search=t),wp.media.ajax(a,{context:i,data:r,success:function(e){var t=new Backbone.Collection(e);i.collection.reset(),i.collection.add(t.models),i.collection.each((function(e){i.$el.find("ul.envira-gallery-attachments").append(i.renderItem(e))}),i),i.trigger("loaded")},error:function(e){i.trigger("loaded",e)}})}},renderItem:function(e){var t;return new wp.media.view.EnviraGalleryItem({model:e}).render().el},renderError:function(e){var t={},i;return t.error=e,new wp.media.view.EnviraGalleryError({model:t}).render().el},addToSelection:function(e,t){var i=this;i.trigger("loading"),i.collection.each((function(e){e.get("id")==t&&i.getSelection().add(e)}),i),e.addClass("selected details"),i.trigger("loaded")},removeFromSelection:function(e,t){var i=this;i.trigger("loading"),i.getSelection().each((function(e){i.getSelection().remove([{cid:e.cid}])}),i),e.removeClass("selected details"),i.trigger("loaded")},getSelection:function(){return this.controller.state().props},clearSelection:function(){var e=this;e.selection=e.getSelection(),e.selection.each((function(t){e.$el.find('div[data-id="'+t.get("id")+'"]').parent().removeClass("selected details")}),e),e.selection.reset()}}),wp.media.controller.EnviraGalleryController=wp.media.controller.State.extend({insert_action:"",initialize:function(e){this.props=new Backbone.Collection,this.insert_action=e.insert_action},insert:function(){var e=this,t=this.frame.content.get(),i=[];e.button=e.frame.toolbar.get().get("envira_gallery_insert"),e.button.model.set("text",wp.media.view.l10n.inserting),e.button.model.set("disabled",!0),e.trigger("loading"),t.getSelection().each((function(e){i.push(e.get("id"))}),e),wp.media.ajax(e.insert_action,{context:e,data:{nonce:envira_gallery_media_insert.nonce,post_id:envira_gallery_media_insert.post_id,images:i},success:function(i){jQuery("ul#envira-gallery-output").html(i);var a=jQuery("ul#envira-gallery-output li").length;0!==a&&(jQuery("#envira-empty-gallery").fadeOut().addClass("envira-hidden"),jQuery(".envira-content-images").removeClass("envira-hidden").fadeIn()),jQuery("span.envira-count").html(a),e.trigger("loaded"),e.button.model.set("text",wp.media.view.l10n.insertIntoPost),e.button.model.set("disabled",!1),t.clearSelection(),e.frame.close()},error:function(i){e.button.model.set("text",wp.media.view.l10n.insertIntoPost),e.button.model.set("disabled",!1),t.trigger("loaded",i)}})}});var EnviraGalleryPostFrame=wp.media.view.MediaFrame.Post;wp.media.view.MediaFrame.Post=EnviraGalleryPostFrame.extend({initialize:function(){EnviraGalleryPostFrame.prototype.initialize.apply(this,arguments),_.each(envira_gallery_media_insert.addons,(function(e,t){this.states.add([new wp.media.controller.EnviraGalleryController({id:t,content:t+"-content",toolbar:t+"-toolbar",menu:"default",title:wp.media.view.l10n[t],priority:200,type:"link",insert_action:e+"_insert_images"})]),this.on("content:render:"+t+"-content",_.bind(this.renderContent,this,t,e)),this.on("toolbar:create:"+t+"-toolbar",this.renderToolbar,this)}),this)},renderContent:function(e,t){this.content.set(new wp.media.view.EnviraGalleryView({controller:this,model:this.state().props,addon:e,sidebar_template:e+"-side-bar",get_action:t+"_get_files_folders",search_action:t+"_search_files_folders",insert_action:t+"_insert_images",path:"/"}))},renderToolbar:function(e){e.view=new wp.media.view.Toolbar.EnviraGalleryToolbar({controller:this})}});