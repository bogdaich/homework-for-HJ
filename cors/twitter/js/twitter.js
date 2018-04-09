'use strict';


function callback(book) {
  for (let item in book) {
    if(`${book[item]}`.search('https') !== -1) {
      document.querySelector(`[data-${item}]`).src = book[item];
    } else {
      document.querySelector(`[data-${item}]`).textContent = book[item];
    }
  }
}

const script = document.createElement('script');
script.src = 'https://neto-api.herokuapp.com/twitter/jsonp';
document.body.appendChild(script);
