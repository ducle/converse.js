
// nav-tabs active
$(document).ready(function() {
  $(".tabbed_sidebar").hide();
  $(".nav a").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
  });
  $('.sideclose').click(function(){
    $('#mySidenav').css('width','100px');
    $('.img-open').css('visibility','hidden');
  });
  $('.closebtn').click(function(){
    $('#mySidenav').css('width','0');
    $('.img-open').css('visibility','visible');
  })

  // chat trigger
  $(".open-chat").click(function () {
    $('.tabbed_sidebar').show();
  });

  $(".chat-header-button").click(function () {
    $('.chat_sidebar').hide();
  });
})

// navigation bar transitions
$(function() {
  //caches a jQuery object containing the header element
  var header = $(".fade-transparent");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
      header.removeClass('fade-transparent').addClass("fade-background");
      $('.navbar-right-links > li > a').css('color','#000');
      $('.login-button').css('border-color','#000');
      $('.navbar-left-link > li > div > a').css('color','#000');
    } else {
      header.removeClass("fade-background").addClass('fade-transparent');
      $('.navbar-right-links > li > a').css('color','#fff');
      $('.login-button').css('border-color','#fff');
      $('.navbar-left-link > li > div > a').css('color','#fff');
    }
  });
});
// side bar


