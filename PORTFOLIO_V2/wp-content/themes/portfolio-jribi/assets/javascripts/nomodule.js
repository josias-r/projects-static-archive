//Home
function preHomeEntry() {
  //Wrap name with spans
  $('main > section.container-home .name > h2').each(function(){
    var wrap = $(this);
    wrap.html(wrap.text().replace(/([^\x00-\x80]|\w)/g, "<span style='transform: translateX(-50px)'>$&</span>"));
  });
}
function homeEntry() {
  //Animate Home
  $('main > section.container-home .name > h2 > span').each(function(index, el) {
    var nameSlide = anime.timeline();
    nameSlide.add({
      targets: el,
      translateX: 0,
      opacity: [0, 1],
      delay: index*100,
      elasticity: 200,
    });
  });
  //Animate Bar
  var loadAni = anime.timeline();
  loadAni.add({
    targets: 'main > section.container-home > .bar',
    height: '50px',
    easing: 'easeInOutQuad',
    duration: 400,
  });
}

//About
function preAboutEntry() {
  // var detElHeight = $('main > section.about .skills .skill-group .detail > div').outerHeight();
  // console.log(detElHeight);
  $('main > section.container-about .skills .skill-group').each(function(index, el) {
    var average = 0;
    var amount = 0;
    var final;
    $(this).find('.detail > div > .amount').each(function(index, el) {
      var progress = $(this).attr('data-progress');
      if (progress) {
        $(this).text(progress+'%');
        $(this).append('<div class="bar"></div>');
        $(this).children('.bar').css('width', progress+'%');
        average += parseFloat(progress);
        ++amount;
        final = parseFloat(Math.round(average/amount));
      }
    });
    $(this).find('> .amount').text(final+'%').append('<div class="bar"></div>');
    $(this).find('> .amount').children('.bar').css('width', final+'%');
  });
}

//Work
function preWorkEntry() {
  // //Count Projects
  // $('main > section.container-work > div > div').each(function(index) {
  //   index++;
  //   var counter = ('0'+index).slice(-2);
  //   $(this).find('.counter').text(counter);
  // });
}
function workEntry() {
  //Animate Projects
  $('main > section.container-work > div > div').each(function(index, el) {
    var loadAni = anime.timeline();
    $(el).css('transition', 'none');
    loadAni.add({
      targets: el,
      translateY: ['-3em', 0],
      opacity: 1,
      delay: index*100,
      elasticity: 200,
      duration: 1000,
      complete: function(anim) {
        $(el).css({
          'transform': '',
          'transition': ''
        });
      }
    });
  });
}

//Contact
function contactEntry() {
  //Animate Contact Form
  var loadAni = anime.timeline();
  loadAni.add({
    targets: 'main > section.container-contact > div',
    translateY: ['-2em', 0],
    opacity: 1,
    elasticity: 200,
    duration: 1000,
    complete: function(anim) {
      $('main > section.container-contact > div').css({
        'transform': '',
      });
    }
  });
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


document.addEventListener("DOMContentLoaded", function() {
  preHomeEntry();
  homeEntry();
  preAboutEntry();
  preWorkEntry();
  workEntry();
  contactEntry();
  $('.browser-warning').addClass('active');
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



//Contact Form
$(document).on('click', '.send', function(e) {
  e.preventDefault();
  var submitBtn = $(this).closest('form').find(':submit');
  submitBtn.click();
});
$(document).on('click', '.bischduenmensch', function() {
  $(this).toggleClass('ja');
});
