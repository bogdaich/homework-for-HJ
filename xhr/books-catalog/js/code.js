'use strict';
document.addEventListener('DOMContentLoaded', function () {
  let content = document.querySelector('#content');
  content.removeChild(document.querySelector('#content li'));

  let books = [];

  let xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://neto-api.herokuapp.com/book/'
  );
  xhr.send();
  xhr.addEventListener('load', function (e) {
    if(xhr.status !== 200) {
      console.log(new Error('Ошибка XHR!'));
      return;
    }
    try {
      books = JSON.parse(xhr.response);
    } catch (e) {
      console.log(new Error('Ошибка JSON!'));
    }
    books.forEach(function (val) {
      let li = document.createElement('li');
      li.dataset.title = val.title;
      li.dataset.author = val.author.name;
      li.dataset.info = val.info;
      li.dataset.price = val.price;
      let img = document.createElement('img');
      img.src = val.cover.small;
      content.appendChild(li);
      li.appendChild(img);
    })
  })
});
