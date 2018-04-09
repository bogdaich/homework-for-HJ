'use strict';


function loadData(url) {
  function randName() {
    return 'callback' + Math.floor(Math.random() * 100) ;
  }

  return new Promise((done, fail) => {
    const script = document.createElement('script');
    const functionName = randName();
    window[functionName] = done;
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

loadData('https://neto-api.herokuapp.com/food/42')
.then(renderRecipe);

function renderRecipe(data) {
  document.querySelector('[data-pic]').style.backgroundImage = `url(${data.pic})`;
  document.querySelector('[data-title]').textContent = data.title;
  document.querySelector('[data-ingredients]').textContent = data.ingredients.join(', ');
}

loadData('https://neto-api.herokuapp.com/food/42/rating')
  .then(renderRating);

function renderRating(data) {
  document.querySelector('[data-rating]').textContent = data.rating.toFixed(2);
  document.querySelector('[data-star]').style.width = `${data.rating * 100 / 10}%`;
  document.querySelector('[data-votes]').textContent = `(${data.votes} оценок)`;
}

loadData('https://neto-api.herokuapp.com/food/42/consumers')
  .then(renderConsumers);

function renderConsumers(data) {
  console.log(data);
  const cont = document.querySelector('[data-consumers]');
  data.consumers.forEach(item => {
    const img = document.createElement('img');
    img.src = item.pic;
    img.title = item.name;
    cont.appendChild(img);
  });
  const span = document.createElement('span');
  span.textContent = ` (+${data.total})`;
  cont.appendChild(span);
}
