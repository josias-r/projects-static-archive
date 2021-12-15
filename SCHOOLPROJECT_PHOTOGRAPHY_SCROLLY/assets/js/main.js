function nextSlide() {
  if ($('.topic .active').next('section').length != 0) {
    $('.topic .active').removeClass('active').next('section').addClass('active')
    x = $('.topic .active').offset().top + $('.topic').scrollTop();
    $('.topic').stop().animate({
      scrollTop:x
    }, 800, 'swing');
  }
  if ($('.content .active').prev('section').length != 0) {
    $('.content .active').removeClass('active').prev('section').addClass('active');
    y = $('.content .active').offset().top + $('.content').scrollTop();
    $('.content').stop().animate({
      scrollTop:y
    }, 800, 'swing');
  }
}
function prevSlide() {
  if ($('.topic .active').prev('section').length != 0) {
    $('.topic .active').removeClass('active').prev('section').addClass('active');
    x = $('.topic .active').offset().top + $('.topic').scrollTop();
    $('.topic').stop().animate({
      scrollTop:x
    }, 800, 'swing');
  }
  if ($('.content .active').next('section').length != 0) {
    $('.content .active').removeClass('active').next('section').addClass('active');
    y = $('.content .active').offset().top + $('.content').scrollTop();
    $('.content').stop().animate({
      scrollTop:y
    }, 800, 'swing');
  }
}
$( function () {
  $(window).on('load', function() {
    $('.preloader').delay(1000).fadeOut(1000);
    $('.content').scrollTop($('.content .active').offset().top + $('.content').scrollTop());
  });
  $(window).on('resize', function() {
    $('.topic').scrollTop($('.topic .active').offset().top + $('.topic').scrollTop());
    $('.content').scrollTop($('.content .active').offset().top + $('.content').scrollTop());
  });
  $('.container').on('mousedown', '.active', function(e) {
    switch (e.which) {
      case 1:
      nextSlide();
      break;
      case 3:
      prevSlide();
      break;
      default:
        alert('You have a strange Mouse!');
    }
  });
  $(document).keydown(function(e) {
      switch(e.which) {
      case 37: // left
        prevSlide();
      break;

      case 38: // up
        prevSlide();
      break;

      case 39: // right
        nextSlide();
      break;

      case 40: // down
        nextSlide();
      break;
      default: return; //exit
    }
    e.preventDefault();
  });
})
