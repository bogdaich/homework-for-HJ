'use strict';

document.onreadystatechange = function () {
  if (document.readyState === 'interactive') {
    let images = [
      'i/breuer-building.jpg',
      'i/guggenheim-museum.jpg',
      'i/headquarters.jpg',
      'i/IAC.jpg',
      'i/new-museum.jpg'
    ];
    let container = document.getElementById('currentPhoto');
    container.setAttribute('src', images[0]);
    let counter = 0;
    document.getElementById('nextPhoto').onclick = function () {
      if (counter >= images.length - 1)
        counter = 0;
      counter++;
      container.setAttribute('src', images[counter]);
    };
    document.getElementById('prevPhoto').onclick = function () {
      if (counter <= 0)
        counter = images.length;
      counter--;
      container.setAttribute('src', images[counter]);
    };
  }
};
