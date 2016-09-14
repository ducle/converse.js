(function() {
  $(function() {
    $('.vote-btn').mouseenter(function() {
      $(this).find('.icon').toggleClass('grey');
      return $(this).find('.icon').toggleClass('red');
    });
    return $('.vote-btn').mouseleave(function() {
      $(this).find('.icon').toggleClass('grey');
      return $(this).find('.icon').toggleClass('red');
    });
  });

}).call(this);
