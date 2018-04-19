'use strict';

const eye = document.querySelector('.big-book__eye');
const pupil = document.querySelector('.big-book__pupil');
let eyeCenter = {
  x: 0,
  y: 0
};
const mousePos = {
  x: 0,
  y: 0
};

document.addEventListener('mousemove', event => {
  mousePos.x = event.clientX;
  mousePos.y = event.clientY;
});

let timer = null;

function tick(timestamp) {
  getEyeCenter();
  pupil.style.setProperty('--pupil-size', getSizePupil());
  const offset = getOffsetPupil();
  pupil.style.setProperty('--pupil-x', `${offset.x}px`);
  pupil.style.setProperty('--pupil-y', `${offset.y}px`);

  //console.log(getAngle(mousePos, eyeCenter));

  timer = requestAnimationFrame(tick);
}

timer = requestAnimationFrame(tick);

function getEyeCenter() {
  const coords = eye.getBoundingClientRect();
  eyeCenter = {
    x: coords.left + (coords.right - coords.left) / 2,
    y: coords.top + (coords.bottom - coords.top) / 2
  };
}

function getSizePupil() {
  const distance = getDistance(mousePos, eyeCenter);
  return Math.max((1 - Math.min(distance / eyeCenter.x, 1)) * 3, 1);
}

function getDistance(point1, point2) {
  return Math.sqrt(Math.pow((point1.x - point2.x), 2) + Math.pow((point1.y - point2.y), 2));
}

function getOffsetPupil() {
  const offset = {
    x: 0,
    y: 0
  };
  offset.x = getOffset(mousePos.x, eyeCenter.x, document.documentElement.clientWidth);
  offset.y = getOffset(mousePos.y, eyeCenter.y, document.documentElement.clientHeight);
  return offset;
}

function getOffset(coord1, coord2, axisSize) {
  const offset = coord1 > coord2
    ? (coord1 - coord2) / (axisSize - coord2) * 30
    : (coord1 - coord2) / coord2 * 30;
  return Math.min(offset, 30);
}

//function getAngle(point1, point2) {
//  const a = Math.atan2((point1.y - point2.y), (point1.x - point2.x)) * 180 / Math.PI;
//  return a < 0 ? a + 360 : a;
//}
