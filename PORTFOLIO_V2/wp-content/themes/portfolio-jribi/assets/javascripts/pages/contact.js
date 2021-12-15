"use strict";


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

function barbaInit() {
	var Contact = Barba.BaseView.extend({
		namespace: 'page-contact',
		onEnterCompleted: function() {
			contactEntry();
		},
	});
	Contact.init();
}

//Exports
export { barbaInit };
