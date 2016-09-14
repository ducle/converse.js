(function() {
  $(function() {
    var edit_phone_input, help_block, original_help_text, warning_text;
    $('#user_last_name').focus();
    edit_phone_input = $('#user-form-edit #user_phone_number');
    edit_phone_input.focus();
    help_block = $('div.user_phone_number p.help-block');
    original_help_text = help_block.html();
    warning_text = "<strong style='color: red;'>You will get a SMS message later.</strong>";
    edit_phone_input.change(function() {
      if ($(this).val() !== $(this).attr('value')) {
        return help_block.html(warning_text);
      } else {
        return help_block.html(original_help_text);
      }
    });
    return $('#connect-fb').click(function() {
      return $('#login_form').removeClass('hide');
    });
  });

}).call(this);
