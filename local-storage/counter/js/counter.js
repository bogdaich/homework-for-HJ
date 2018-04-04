'use strict';


const counterElement = document.querySelector('#counter');
let counter = 0;

if (localStorage.getItem('counter') === null) {
  localStorage.counter = 0;
}
counter = parseInt(localStorage.counter);

showCounter();

document.querySelector("#increment").addEventListener('click', () => {
  changeCounter(1);
});

document.querySelector("#decrement").addEventListener('click', () => {
  changeCounter(-1);
});

document.querySelector("#reset").addEventListener('click', () => {
  changeCounter(null, true);
});

function changeCounter(value, reset = false) {
  if (reset) {
    counter = 0;
  } else {
    counter += value;
    counter = counter < 0 ? 0 : counter;
  }
  localStorage.counter = counter;
  showCounter();
}

function showCounter() {
  counterElement.innerText = counter;
}
