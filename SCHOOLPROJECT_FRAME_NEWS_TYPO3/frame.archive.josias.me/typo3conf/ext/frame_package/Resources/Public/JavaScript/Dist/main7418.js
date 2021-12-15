/*!
 * Frame Package v1.0.0 (https://frame-magazine.ch)
 * Copyright 2017-2018 Josias Ribi
 * Licensed under the GPL-2.0-or-later license
 */

function checkIE() {
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");

	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
	{
		console.log('Internet Explorer, rly?');
		$('.size-warning').css('display', 'block').children('p').text('This webpage is not supported on such ancient browsers, please upgrade!');
	}
}


$(function(){
	checkIE();
	$('nav .drop').on('click', function() {
		$(this).children('ul').toggleClass('open');
	});

	$('.scrollup').on('click', function(e) {
		e.preventDefault();
		console.log('scolling up');
		$('html, body').animate({
			scrollTop:0
		});
	});

	$(window).on('scroll', function() {
		if ($(window).scrollTop() + $('nav').height() >= $(window).height()) {
			$('.nav-home').addClass('toggled').removeClass('nav-home');
		} else {
			$('.toggled').addClass('nav-home').removeClass('toggled');
		}
	});

	$.fn.random = function() {
		return this.eq(Math.floor(Math.random() * this.length));
	}
	$('.head.head-home .highlight-post').random().addClass('active');
	window.setInterval(function(){
		var $item = $('.head.head-home .highlight-post.active');
    var $next = $item.next('.highlight-post');
		if( $next.length == 0 ) {
			 $item.removeClass('active')
			 $('.head.head-home .highlight-post:first').addClass('active');
		} else {
			 $item.removeClass('active').next('.highlight-post').addClass('active');
		}
	}, 10000);


});
