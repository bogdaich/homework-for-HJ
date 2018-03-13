'use strict';

const links = document.getElementsByTagName('a');
const images = document.getElementsByClassName('gallery-view')[0];

function imageSelect(event) {
	event.preventDefault();
	for (let i = 0; i < links.length; i++) {
		links[i].classList.remove('gallery-current');
	}
	this.classList.add('gallery-current');
	images.src = this.href;
}

for (let i = 0; i < links.length; i++) {
	links[i].addEventListener('click',imageSelect);
}
