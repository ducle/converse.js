(function() {
  $(function() {
    $('.ui.rating').rating();
    $('i.warning.icon.big').popup();
    $('.ui.dropdown').dropdown();
    $('#sign_in_modal').modal();
    return $('.sign_in_link').click(function() {
      return $('#sign_in_modal').modal('show');
    });
  });

}).call(this);
