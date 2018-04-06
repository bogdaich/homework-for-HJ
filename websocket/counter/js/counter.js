'use strict';


const  ws = new WebSocket('wss://neto-api.herokuapp.com/counter');
ws.addEventListener('message', e => {
  const res = JSON.parse(e.data);
  document.querySelector('.counter').textContent = res.connections;
  document.querySelector('.errors').textContent = res.errors;
});
window.addEventListener('beforeunload', () => {
  ws.close(1000);
});
