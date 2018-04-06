'use strinct';


const ws = new WebSocket('wss://neto-api.herokuapp.com/mouse');
window.addEventListener('beforeunload', () => {
  ws.onclose = function () {};
  ws.close()
});
showBubbles(ws);
document.addEventListener('click', function (e) {
  const click = {};
  click.x = e.pageX;
  click.y = e.pageY;
  ws.send(JSON.stringify(click));
});
