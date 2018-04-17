'use strict';


function longPooling(url) {
  const cont = document.querySelector('.long-pooling');
  getNumber();

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
        return item.innerText === e.target.responseText.trim();
      });
      numberArr[0].classList.add('flip-it');
    } else {
      console.log(`Ошибка: ${e.target.statusText}`);
    }
    getNumber();
  }
}

longPooling('https://neto-api.herokuapp.com/comet/long-pooling');
