(function() {
  $(function() {
    var adv_fields;
    adv_fields = $('.advanced_search_fields');
    adv_fields.hide();
    $('.advanced_search_link').click(function() {
      return adv_fields.slideToggle();
    });
    return $('#sign_in_modal').on('ajax:send', function(xhr) {
      return $(this).find('form').addClass('loading');
    }).on('ajax:error', function(e, xhr, status, error) {
      $(this).find('form').removeClass('loading');
      $(this).find('.ui.error.message').addClass('show');
      return $('.ui.error.message').html($.parseJSON(xhr.responseText).error);
    }).on('ajax:success', function(e, data, status, xhr) {
      return $(this).modal('hide');
    });
  });

}).call(this);
