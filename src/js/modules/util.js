'use strict';

console.log('util here');

const info_button = document.getElementsByClassName('controls__icon')[0];
const info_content = document.getElementsByClassName('controls__content')[0];
console.log(info_content);
console.log(info_content.style.display);

info_button.onclick = () => {
	if(info_content.style.display == 'inline-block') {
		info_content.style.display = 'none';
	} else {
		info_content.style.display = 'inline-block';
	}
};