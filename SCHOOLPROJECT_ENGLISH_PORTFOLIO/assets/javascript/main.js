$(function () {
  $('.preloader').fadeOut();
  $('.about').on('click', function() {
    $(this).find('.toggle span').toggleClass('active');
    $(this).toggleClass('active');
  });
})
