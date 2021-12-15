"use strict";


//Work
function preWorkEntry() {
	// //Count Projects
	// $('main > section.container-work > div > div').each(function(index) {
	// 	index++;
	// 	var counter = ('0'+index).slice(-2);
	// 	$(this).find('.counter').text(counter);
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

function barbaInit() {
	var Work = Barba.BaseView.extend({
		namespace: 'page-work',
		onEnter: function() {
			preWorkEntry();
		},
		onEnterCompleted: function() {
			workEntry();
		},
	});
	Work.init();
}

//Exports
export { barbaInit };
