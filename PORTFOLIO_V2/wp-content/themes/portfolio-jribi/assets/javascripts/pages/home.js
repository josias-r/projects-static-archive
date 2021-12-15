"use strict";


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

function barbaInit() {
	//Barba Namespaces
	var Homepage = Barba.BaseView.extend({
		namespace: 'page-home',
		onEnter: function() {
			preHomeEntry();
		},
		onEnterCompleted: function() {
			homeEntry();
		},
	});
	Homepage.init();
}


//Exports
export { barbaInit };
