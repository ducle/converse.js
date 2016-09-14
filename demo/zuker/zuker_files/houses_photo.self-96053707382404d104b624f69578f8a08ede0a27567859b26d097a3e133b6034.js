(function() {
  $(function() {
    $('button#delete-photo-btn').click(function() {
      $('input:checked[name="attachment[remove_image]"]').closest('form.ajax-form').submit();
      return $('input[type="checkbox"][name="attachment[remove_image]"]').prop('disabled', true);
    });
    $('input[type="checkbox"][name="attachment[remove_image]"]').change(function() {
      return $('#delete-photo-btn').toggleClass('hidden', !($('input:checked').length > 0));
    });
    $("#houses_photo").on("ajax:send", function(xhr) {
      return console.log('disable all input');
    }).on("ajax:error", function(e, xhr, status, error) {
      return console.log($.parseJSON(xhr.responseText).error);
    }).on("ajax:success", function(e, data, status, xhr) {
      return console.log('success');
    });
  });

}).call(this);
