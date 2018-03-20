'use strict';
function main() {
	const content = document.querySelector('#content');
	const preloader = document.querySelector('#preloader');
	const tabs = document.querySelectorAll('nav a');
	for(const tab of tabs) {
		tab.addEventListener('click', selectTab);
		if(tab.classList.contains('active')) {
			requestContent(tab.href);
		}
	}

	function selectTab(event) {
		event.preventDefault();
		if(event.currentTarget.classList.contains('active')) {
			return;
		}

		for(const tab of tabs) {
			tab.classList.toggle('active', tab === event.currentTarget)
		}

		requestContent(event.currentTarget.href);
	}

	function requestContent(href) {
		preloader.classList.remove('hidden');
		content.classList.add('hidden');
		const xhr = new XMLHttpRequest();
		xhr.addEventListener('load', onload);
		xhr.open('GET', href);
		document.querySelector('#preloader').classList.remove('hidden');
		xhr.send();

		function onload() {
			preloader.classList.add('hidden');
			if(xhr.status === 200) {
				content.innerHTML = xhr.responseText;
				content.classList.remove('hidden');
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', main);
