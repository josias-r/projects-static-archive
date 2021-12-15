"use strict";


//About
function preAboutEntry() {
	// var detElHeight = $('main > section.container-about .skills .skill-group .detail > div').outerHeight();
	// console.log(detElHeight);
	$('main > section.container-about .skills .skill-group').each(function(index, el) {
		var average = 0;
		var amount = 0;
		var final;
		$(this).find('.detail > div > .amount').each(function(index, el) {
			var progress = parseInt($(this).attr('data-progress'));
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

function barbaInit() {
	var About = Barba.BaseView.extend({
		namespace: 'page-about',
		onEnter: function() {
			preAboutEntry();
		},
		// onEnterCompleted: function() {
		// 	aboutEntry();
		// },
	});
	About.init();
}

//Exports
export { barbaInit };
