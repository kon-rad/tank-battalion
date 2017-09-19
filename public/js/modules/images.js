'use strict';

define(function () {

	// function ImageCollection(list, callback) {
	// 	var total = 0,
	// 		images = {};
	// 	for (var i = 0; i < list.length; i++) {
	// 		var img = new Image();
	// 		img.onload = function() {
	// 			total++;
	// 			if(total == list.length) {
	// 				callback &&callback();
	// 			};
	// 			img.src = list[i].url;
	// 		}
	// 	}
	// 	this.get = function(name) {
	// 		return images[name] || (function(){throw "Doesn't Exist"})();
	// 	};
	// }
	// const images = new ImageCollection([{
	// 	name: 'eagle', url: 'assets/images/eagle.png',
	// 	name: 'explosion', url: 'assets/images/explosion.png'
	// }]);
	var eagle = new Image();
	eagle.src = 'assets/images/eagle.png';
	var explosion = new Image();
	explosion.src = 'assets/images/explosion.png';

	return {
		eagle: eagle,
		explosion: explosion
	};
});