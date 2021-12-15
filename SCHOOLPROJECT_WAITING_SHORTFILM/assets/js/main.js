$(function () {
  $(window).on('load', function() {
    $('.preloader').delay(1000).fadeOut();
  });
  $('.nav-btn').on('click', function() {
    $(this).toggleClass('active');
    $('nav').toggleClass('active');
  });
})
