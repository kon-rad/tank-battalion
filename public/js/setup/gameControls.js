'use strict';

define(['game'], function (game) {

	var control = function control() {
		var display = document.getElementById('display_text');
		display.innerHTML = '<div class="display_text__1player">' + '1 PLAYER</div><br><div class="display_text__2players">' + '2 PLAYER</div>';
		//display.classList.add('show');

		return false;
	};

	return {
		control: control
	};
});