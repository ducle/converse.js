(function() {
  $(function() {
    var reply_forms;
    reply_forms = $('.reply_form form.comment');
    reply_forms.toggle();
    $('.reply_btn .reply_text').click(function(e) {
      var reply_form;
      e.preventDefault();
      console.log($(this).next());
      reply_form = $(this).next().find('form');
      reply_form.toggle();
      reply_form.find('textarea').focus();
      return $(this).toggle();
    });
    $('.comment-content').hide();
    return $('a.show-comment-link').click(function(e) {
      e.preventDefault();
      $(this).siblings('.comment-content-short').toggle();
      return $(this).siblings('.comment-content').slideToggle('fast');
    });
  });

}).call(this);
