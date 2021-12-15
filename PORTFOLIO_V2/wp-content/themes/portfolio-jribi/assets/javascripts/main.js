"use strict";



import * as homeModule from './pages/home.js';
import * as aboutModule from './pages/about.js';
import * as workModule from './pages/work.js';
import * as contactModule from './pages/contact.js';
import * as detailWorkModule from './pages/detail-work.js';

//Detail-Work
function preDetailWork() {

}



export function dynamicNav() {
  // init controller
  var controller = new ScrollMagic.Controller();
  // build scenes
  new ScrollMagic.Scene({triggerElement: ".dynNavTrigger", triggerHook : 0})
    .setClassToggle("nav", "dynamicNav")
    .addTo(controller);
}

function lockScroll(e) {
  e.preventDefault();
}
function getScrollbarWidth() {
  return window.innerWidth - document.querySelector('main').clientWidth;
}

$.fn.random = function() {
  return this.eq(Math.floor(Math.random() * this.length));
}



window.jribiSubmitRequest = function(e){
  e.preventDefault();
  var formContainer = $(e.target).parents('div[role="form"]');

  formContainer.removeClass('flyOut');
  setTimeout(function() {
    formContainer.addClass('flyOut');
  },0);

  setTimeout(function() {
    jribiSubmit(e);
  },1000);
};

function jribiSubmit(e) {
  var currentForm = e.target;
  var url = currentForm.getAttribute( 'action' );
  if (url) {
    var formData = new FormData( currentForm );
    var div = currentForm.querySelector(".alert");

    var bischduenmensch = currentForm.querySelector('.bischduenmensch');
    if ($(bischduenmensch).hasClass('ja')) {
      var email = formData.get('email');
      formData.append('bischduenmensch', email);
    } else {
      formData.append('bischduenmensch', 'nope');
    }

    var req = new XMLHttpRequest();
    req.open('POST', url);
    req.responseType = 'json';
    req.onload = function(e) {
      if (req.status === 200) {
        var reqRes = req.response;
        if (typeof reqRes === 'string') {
          reqRes = JSON.parse(req.response);
        }
        div.innerHTML = reqRes.response;
        div.className= 'alert active '+reqRes.class;
      } else {
        div.innerHTML = 'Es ist ein Fehler aufgetreten: Error '+req.status;
        div.className = 'alert active error';
      }
    };
    req.send(formData);
  }
}




$(function  () {

  //Quote Slider
  window.setInterval(function(){
    if ($('.quote').children().length > 1) {
      var $item = $('.quote > span.active');
      var $next = $item.next();
      $item.removeClass('active')
      if( $next.length == 0 ) {
         $('.quote > span:first').addClass('active');
      } else {
        $next.addClass('active');
        var nextAni = anime.timeline();
        nextAni.add({
          targets: $next.get(0),
          translateX: ['2em', 0],
          elasticity: 150,
          duration: 1000,
          complete: function() {
            $($next.get(0)).css({
              'transform': '',
            });
          }
        });
      }
    }
  }, 10000);

  //Contact Form
  $(document).on('click', '.send', function(e) {
    e.preventDefault();
    var submitBtn = $(this).closest('form').find(':submit');
    submitBtn.click();
  });
  $(document).on('click', '.bischduenmensch', function() {
    $(this).toggleClass('ja');
  });

  var bodyChange = new Event('bodyChange');

  var bodyClasses;
  document.addEventListener('bodyChange', function () {
    $('body').attr('class', bodyClasses);
  });


  homeModule.barbaInit();
  aboutModule.barbaInit();
  workModule.barbaInit();
  detailWorkModule.barbaInit();
  contactModule.barbaInit();


  Barba.Pjax.start();


  var originalNav;
  var newNav;
  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {
    //Get new Body Classes
    var response = newPageRawHTML.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', newPageRawHTML);
    bodyClasses = $(response).filter('notbody').attr('class');
    document.dispatchEvent(bodyChange);

    //Get new Header
    var el = document.createElement( 'html' );
    el.innerHTML = newPageRawHTML;
    originalNav = document.querySelector('nav');
    newNav = el.querySelector('nav');
    document.querySelector('header').removeChild(originalNav);
    document.querySelector('header').appendChild(newNav);
  });

  var targetEl;
  $(document).on('click', 'a', function() {
    targetEl = this;
  });
  $(document).on('click', 'main > section.container-about .skills .skill-group', function() {
    $(this).toggleClass('active');
    var detail = $(this).find('.detail').find('> div');
    if ($(this).hasClass('active')) {
      var elHeight = detail.outerHeight(true)  ;
      var elLength = 0;
      detail.each(function(index, el) {
        ++elLength;
      });
      detail.parent().stop().animate({'max-height': elHeight*elLength});
    } else {
      detail.parent().stop().animate({'max-height': '0'});
    }
  });

  var BlendTransition = Barba.BaseTransition.extend({
    start: function() {
      Promise
        .all([this.newContainerLoading])
        .then(this.loadPage.bind(this));
    },

    loadPage: function() {
      const prev = Barba.HistoryManager.prevStatus();
      const curr = Barba.HistoryManager.currentStatus();
      var _this = this;
      var newContainer = $(_this.newContainer);
      if (prev.namespace === 'page-work' && curr.namespace === 'page-work-detail' && targetEl) {
        // Reset tilt instance
      	$('[data-tilt]').tilt();
        // disable scrolling
        $('main').bind('mousewheel touchmove', lockScroll);
        var image = $(targetEl).siblings('img').clone();

        var elOffset = targetEl.getBoundingClientRect();
        $(targetEl).parent().after(image);
        $(image).wrap( "<div class='to-detail'></div>");
        $('.to-detail').css({
          'left' : elOffset.left,
          'top' : elOffset.top,
          'right' : window.innerWidth - (elOffset.left + elOffset.width),
          'bottom' : window.innerHeight - (elOffset.top + elOffset.height)
        });
        $('.to-detail').animate({
          'left' : 0,
          'top' : 0,
          'right' : getScrollbarWidth()+'px',
          'bottom' : 0
        }, function() {
          document.querySelector('main').scrollTop = 0;

          newContainer.addClass('from-work');
          // enable scrolling
          $('main').unbind('mousewheel touchmove', lockScroll);
          _this.done();
        });

        targetEl = '';

      } else {
        // Reset tilt instance
        $('[data-tilt]').tilt();
        // disable scrolling
        $('body').bind('mousewheel touchmove', lockScroll);
        var scrollTime = $('main').scrollTop()/2 < 400 ? $('main').scrollTop()/2 : 400;
        $('main').animate({scrollTop: 0}, scrollTime,function(){
          newContainer.css({
            visibility : 'visible',
            opacity : 0,
            position : 'absolute',
            width : '100%',
            top : 0
          });
          newContainer.animate({ opacity: 1 }, function() {
            newContainer.css({
              opacity : '',
              position : '',
              width : '',
              top : ''
            });
            // enable scrolling
            $('body').unbind('mousewheel touchmove', lockScroll);
            _this.done();
          });
        });
      }
    }
  });

  Barba.Pjax.getTransition = function() {
    return BlendTransition;
  };
});
