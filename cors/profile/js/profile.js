'use strict';


function loadData(url, data) {
  function randName() {
    return 'callback' + Math.floor(Math.random() * 9) + 1;
  }

  return new Promise((done, fail) => {
    const script = document.createElement('script');
    const functionName = randName();
    window[functionName] = done;
    if (data) {
      url = url.replace(/:id/g, data.id);
    }
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

function renderProfile(data) {
  loadData('https://neto-api.herokuapp.com/profile/:id/technologies', data)
    .then(renderTechnologies);
  document.querySelector('[data-name]').textContent = data.name;
  document.querySelector('[data-pic]').src = data.pic;
  document.querySelector('[data-position]').textContent = data.position;
  document.querySelector('[data-description]').textContent = data.description;
  document.querySelector('.content').style.display = 'initial';
  function renderTechnologies(data) {
    const cont = document.querySelector('[data-technologies]');
    data.forEach(item => {
      const span = document.createElement('span');
      span.classList.add('devicons', `devicons-${item}`);
      cont.appendChild(span);
    });
  }
}

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(renderProfile);
