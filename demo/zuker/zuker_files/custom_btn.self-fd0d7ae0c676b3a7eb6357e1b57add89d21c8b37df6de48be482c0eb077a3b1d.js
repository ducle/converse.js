(function() {
  $(function() {
    var checkbox_class, radio_class;
    radio_class = 'btn-warning';
    checkbox_class = 'btn-info';
    $('label.btn.act_as_radio_button').click(function(e) {
      var input, parent_div;
      e.preventDefault();
      parent_div = $(this).closest("div");
      parent_div.find("label.btn.act_as_radio_button").removeClass(radio_class);
      input = $(this).find('input[type="radio"]');
      $(this).addClass(radio_class);
      return input.prop('checked', true);
    });
    return $('label.btn.act_as_check_box').click(function(e) {
      var input;
      e.preventDefault();
      input = $(this).find('input[type="checkbox"]');
      input.prop('checked', !input.prop('checked'));
      return $(this).toggleClass(checkbox_class);
    });
  });

}).call(this);
