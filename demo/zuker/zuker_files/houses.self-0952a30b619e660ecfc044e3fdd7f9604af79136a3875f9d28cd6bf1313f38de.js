$(document).ready(function() {
  translation = document.getElementById('translation');
  if (translation) {
    translation = translation.innerHTML;
    tr = JSON.parse(translation);

    $("#house-profile").on("ajax:send", function(xhr) {
      return $(".ajax-text").text(tr.saving);
    }).on("ajax:error", function(e, xhr, status, error) {
      $(".ajax-text").text($.parseJSON(xhr.responseText).error);
      return console.log($.parseJSON(xhr.responseText).error);
    }).on("ajax:success", function(e, data, status, xhr) {
      return $(".ajax-text").text(tr.completed);
    });
  }

  $(".ajax-input textarea").data('value', $(".ajax-input textarea").val());
  $(".ajax-input input").data('value', $(".ajax-input input").val());
  $('#house_reservable_date').data('value', $('#house_reservable_date').val());
  $('#datetimepicker2').data('value', $('#datetimepicker2').val());
  $(".ajax-input input[type='radio']").parent("label.btn.act_as_radio_button").click(function() {
    return $(this).closest('form.ajax-form').submit();
  });
  $(".ajax-input input[type='checkbox']").parent("label.btn.act_as_check_box").click(function() {
    return $(this).closest('form.ajax-form').submit();
  });
  $(".ajax-input input[type='checkbox']").click(function() {
    return $(this).closest('form.ajax-form').submit();
  });
  $(".ajax-input input, .ajax-input textarea").blur(function() {
    if ($(this).data('value') !== $(this).val()) {
      $(this).data('value', $(this).val());
      return $(this).closest('form.ajax-form').submit();
    }
  });
  $(".ajax-input select").change(function() {
    if ($(this).data('value') !== $(this).val()) {
      $(this).data('value', $(this).val());
      return $(this).closest('form.ajax-form').submit();
    }
  });
  // $('#twzipcode').twzipcode();
  // return $("#twzipcode select").change(function() {
  //   return $(this).closest('form.ajax-form').submit();
  // });

});

