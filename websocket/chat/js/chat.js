'use strict'


const  ws = new WebSocket('wss://neto-api.herokuapp.com/chat');
const chatCont = document.querySelector('.chat');
const statusCont = chatCont.querySelector('.chat-status');
const submit = chatCont.querySelector('.message-submit');
const input = chatCont.querySelector('.message-input');
const content = chatCont.querySelector('.messages-content');
const msg = chatCont.querySelectorAll('.message');

ws.addEventListener('open', openChat);
ws.addEventListener('message', getMessages);
ws.addEventListener('close', closeChat);
ws.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`);
});
submit.addEventListener('click', send);

function openChat(e) {
  statusCont.textContent = statusCont.dataset.online;
  submit.disabled = false;
  const msgStatusTpl = msg[3];
  const msgStatus = content.appendChild(msgStatusTpl.cloneNode(true));
  msgStatus.querySelector('.message-text').textContent = 'Пользователь появился в сети';
}

function getMessages(e) {
  const msgLoadTpl = msg[0];
  const msgFromTpl = msg[1];

  if(e.data === '...') {
    const msgLoad = content.appendChild(msgLoadTpl.cloneNode(true));
    msgLoad.querySelector('span').textContent = e.data;
  } else {
    if(content.querySelector('.loading')){
      content.removeChild(content.querySelector('.loading'));
    }
    const msgFrom = content.appendChild(msgFromTpl.cloneNode(true));
    msgFrom.querySelector('.message-text').textContent = e.data;
    msgFrom.querySelector('.timestamp').textContent = getTime();
  }
}

function send(e) {
  e.preventDefault();
  ws.send(input.value);
  const msgToTpl = msg[2];
  const msgTo = content.appendChild(msgToTpl.cloneNode(true));
  msgTo.querySelector('.message-text').textContent = input.value;
  msgTo.querySelector('.timestamp').textContent = getTime();
}

function closeChat() {
  statusCont.textContent = statusCont.dataset.offline;
  submit.disabled = true;
  const msgStatusTpl = msg[3];
  const msgStatus = content.appendChild(msgStatusTpl.cloneNode(true));
  msgStatus.querySelector('.message-text').textContent = 'Пользователь не в сети';
}

function getTime() {
  const time = new Date();
  let hours = time.getHours();
  let min = time.getMinutes();
  if(hours < 10)
    hours = '0' + hours;
  if(min < 10)
    min = '0' + min;
  return `${hours}:${min}`
}

setTimeout(function () {
  ws.close(1000);
}, 30000);
