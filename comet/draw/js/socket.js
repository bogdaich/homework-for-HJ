'use strict';


const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');
ws.addEventListener('message', event => {
  editor.addEventListener('update', event => {
    event.canvas.toBlob(blob => ws.send(blob));
  });
});
