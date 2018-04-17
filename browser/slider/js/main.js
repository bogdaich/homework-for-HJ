'use strict';

var i = 0;
const images = ['i/airmax-jump.png',
  'i/airmax-on-foot.png',
  'i/airmax-playground.png',
  'i/airmax-top-view.png',
  'i/airmax.png'];

window.onload = function () {
  setInterval(fn, 5000);
}
function fn() {
  document.getElementById('slider').src = images[i];
  i++;
  if (i >= images.length) i=0;
}
