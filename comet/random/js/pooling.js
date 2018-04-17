'use strict';


function pooling(url) {
  const cont = document.querySelector('.pooling');
  getNumber();
  setInterval(getNumber, 5000);
  function getNumber() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.addEventListener('load', listener);
    xhr.send();
  }
  function listener(e) {
    if (`${e.target.status}`.charAt(0) === '2' && typeof parseInt(e.target.responseText) === 'number') {
      const numbers = Array.from(cont.querySelectorAll('div'));
      const numberArr = numbers.filter(item => {
        item.classList.remove('flip-it');
        return item.innerText === e.target.responseText;
      });
      numberArr[0].classList.add('flip-it');
    } else {
      console.log(`Ошибка: ${e.target.statusText}`);
    }
  }
}

pooling('https://neto-api.herokuapp.com/comet/pooling');
