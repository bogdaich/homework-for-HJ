'use strict';
let nav = document.getElementsByTagName('nav')[0];

function menu(e) {
  if (e.ctrlKey && e.altKey && e.code === 'KeyT') {
    nav.classList.toggle('visible');
  }
}
let secret = document.getElementsByClassName('secret')[0];
let secretCode = ['KeyY',
            'KeyT',
            'KeyN',
            'KeyJ',
            'KeyK',
            'KeyJ',
            'KeyU',
            'KeyB',
            'KeyZ'];
let secretCodeString = secretCode.join('');
let codeFromPerson = [];
function ifSecretCode(e) {

  codeFromPerson.push(e.code);
  let codeFromPersonString = codeFromPerson.join('').substr(-secretCodeString.length);
    if (codeFromPersonString === secretCodeString) {
    secret.classList.add('visible');
  }
  }

document.addEventListener('keydown', menu);
document.addEventListener('keydown', ifSecretCode);
