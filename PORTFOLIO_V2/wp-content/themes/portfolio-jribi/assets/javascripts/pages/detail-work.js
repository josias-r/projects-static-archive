"use strict";


import { dynamicNav } from "../main.js";

function barbaInit() {
	var DetailWork = Barba.BaseView.extend({
		namespace: 'page-work-detail',
		onEnter: function() {
		},
		onEnterCompleted: function() {
			dynamicNav();
		},
	});
	DetailWork.init();
}

//Exports
export { barbaInit };
