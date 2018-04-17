'use strict';


function webSocket(url) {
  const cont = document.querySelector('.websocket');
  const numbers = Array.from(cont.querySelectorAll('div'));
  const ws = new WebSocket(url);
  ws.addEventListener('message', listener);
  function listener(e) {
      const numberArr = numbers.filter(item => {
        item.classList.remove('flip-it');
        return item.innerText === e.data;
      });
      numberArr[0].classList.add('flip-it');
  }
}

webSocket('wss://neto-api.herokuapp.com/comet/websocket');
