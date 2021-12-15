$(function(){
	var bounce = anime({
		targets: '.box',
		translateY: '10px',
		duration: 300,
		loop: true,
		direction: 'alternate',
		easing: 'easeInCubic',
		scaleX: {
			value: 1.5,
			duration: 150,
			delay: 200
		}
	});
});

var controller = new ScrollMagic.Controller();

var scene = new ScrollMagic.Scene({triggerElement: ".title", triggerHook : 0, duration: "100%"})
	.setTween("#liquify feDisplacementMap", { attr: {scale:200} })
	.addTo(controller);
