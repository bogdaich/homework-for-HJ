'use strict';
let mode = document.getElementsByTagName('ul')[0];
const audio = document.getElementsByTagName('audio');
const keys = document.getElementsByTagName('li');

const middleSound = ['sounds/middle/first.mp3', 'sounds/middle/second.mp3', 'sounds/middle/third.mp3', 'sounds/middle/fourth.mp3', 'sounds/middle/fifth.mp3'];

const lowerSound = ['sounds/lower/first.mp3', 'sounds/lower/second.mp3', 'sounds/lower/third.mp3', 'sounds/lower/fourth.mp3', 'sounds/lower/fifth.mp3'];

const higherSound = ['sounds/higher/first.mp3', 'sounds/higher/second.mp3', 'sounds/higher/third.mp3', 'sounds/higher/fourth.mp3', 'sounds/higher/fifth.mp3'];

let library = {
	middle: middleSound,
	lower: lowerSound,
	higher: higherSound
}


function searchNote(list) {
	for (let i = 0; i < audio.length; i++) {
		audio[i].src = library[list][i];
	}
}
function searchMode () {
	if (mode.classList.contains('middle')) {
		searchNote('middle');
	} else if (mode.classList.contains('lower')) {
		searchNote('lower');
	} else if (mode.classList.contains('higher')) {
		searchNote('higher');
	}
}
function play() {
	this.getElementsByTagName('audio')[0].play();
}
for (let i = 0; i < keys.length; i++) {
	keys[i].addEventListener('click', play);
}
searchMode();

function keyDown(event) {
	if (!event.repeat) {
		if (event.shiftKey) {
			mode.classList.remove('middle');
			mode.classList.add('lower');
			searchMode();
			document.addEventListener('keyup', shiftUp);
		} else if(event.altKey) {
			mode.classList.remove('middle');
			mode.classList.add('higher');
			searchMode();
			document.addEventListener('keyup', altUp);
		}
	}
}
function altUp(event) {
	if (!event.repeat) {
		if (!event.altKey) {
			mode.classList.remove('higher');
			mode.classList.add('middle');
			searchMode();
			document.removeEventListener('keyup', altUp);
		}
	}
}
function shiftUp(event) {
	if (!event.repeat) {
		if (!event.shiftKey) {
			mode.classList.remove('lower');
			mode.classList.add('middle');
			searchMode();
			document.removeEventListener('keyup', shiftUp);
		}
	}
}
document.addEventListener('keydown', keyDown);
