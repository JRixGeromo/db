jQuery(document).ready(function($) {

    $('.grw-admin-page a.nav-tab').on('click', function(e)  {
        var $this = $(this), activeId = $this.attr('href');
        $(activeId).show().siblings('.tab-content').hide();
        $this.addClass('nav-tab-active').siblings().removeClass('nav-tab-active');
        e.preventDefault();
    });

});