$('.rnd-bg').each( function() {
	rnd = Math.floor(Math.random() * 256) + 0;
	$(this).css({
		'background-color' : 'hsl('+rnd+', 50%, 50%)',
	});
});
function toggleNav() {
		$('.nav-content').stop().fadeToggle();
		$('nav').toggleClass('nav-expanded');
		$('body').toggleClass('nof');
}
function clearFocus() {
	$('body').removeClass('nof');
	$('.tile, header').removeClass('oof').children().removeClass('anim-img anim-sib').siblings('.btns').stop().fadeOut();
}



$(function(){
	$('#nav-btn, .nav-content a').on('click', function() {
		toggleNav();
	});
	$('.sub').parent().on('click', function() {
		$(this).find('.sub').slideToggle();
		$(this).siblings().find('.sub').slideUp();
	});

	var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	if (is_safari) {
		$('.liquify').css('filter', 'none');
	}
	var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
	if (isIE11) {
		alert('Please upgrade to a modern browser!\nSome inconsistency might occur.');
	}
	$('.am-btn').on('click', function() {
		$('.am-toggle').stop().slideToggle();
	});

	$("a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').css('pointer-events', 'none').stop().animate({
				scrollTop: $(hash).offset().top
			}, 800, function(){
				$('html, body').css('pointer-events', '')
			});
		}
	});


	$('.img').siblings().not('.btns').addClass('sib')
	$('.img:odd').addClass('img-odd')
	.siblings().not('.btns').addClass('sib-odd')

	$('.img-btn').mouseenter(function() {
		$(this).parents('.tile').removeClass('oof').siblings('.tile, header').addClass('oof').css('transition', 'opacity .4s ease');
		$('.img')
		.addClass('anim-img')
		.siblings('.sib, .sib-odd').addClass('anim-sib')
		.siblings('.btns').stop().fadeIn();
		var offsetY = $(this).offset().top - $(window).height() / 2 + 300;
		$('body').addClass('nof');
		$('body, html').stop().animate({
			scrollTop: offsetY
		}, 800)
	})

	$('.title, #am').mouseenter(function(){
		clearFocus();
	})
	$('.tile').mouseleave(function(e) {
		if (e.offsetX < 0 || e.offsetX > $(this).width()) {
			clearFocus()
		}
	});

	$('.btns div').click(function() {
		$('body').find('.img-btn').css('pointer-events', 'none');
		$(this).animate({color: 'black'}, {
			duration: 800,
			complete: function() {
				$('.img-btn').css('pointer-events', '');
			}
		})
	});
	$('.next').on('click', function() {
		$(this).parents('.tile').next().find('.img-btn').trigger('mouseenter');
	});
	$('.prev').on('click', function() {
		$(this).parents('.tile').prev().find('.img-btn').trigger('mouseenter');
	});


	/*$(".img").hover(function(){
		if (!$(this).hasClass('animated')) {
			$(this).dequeue().stop().animate({
			'width' : '+=40em',
			'left' : '5%',
		});
		}
	}, function() {
		$(this).addClass('animated').animate({ width: "100px" }, "normal", "linear", function() {
			$(this).removeClass('animated').dequeue();
		});
	});*/



	/*
	$('.title').on('click', function() {
		$('#dummy').animate({'height':'256px'},{
			duration: 10000,
			step: function(now,fx){
				$('body').css({
					'background-color': 'hsl('+now+', 50%, 50%)',
				});
			}
		});
	});
	*/
});
