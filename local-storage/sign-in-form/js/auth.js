'use strict';


const signInForm = document.querySelector('.sign-in-htm');
const signUpForm = document.querySelector('.sign-up-htm');

for (const form of document.querySelectorAll('form')) {
  form.addEventListener('submit', () => {
    event.preventDefault();
    prepareData(event.currentTarget);
  })
}

function prepareData(form) {
  const resultField = event.currentTarget.querySelector('.error-message');
  const formData = new FormData(event.currentTarget);
  const data = {};
  for(const [k, v] of formData) {
    data[k] = v;
  }
  if (form === signInForm) {
    sendData('signin', data, resultField, 'авторизован');
  } else if (form === signUpForm) {
    sendData('signup', data, resultField, 'зарегистрирован')
  }
}

function sendData(path, data, resultField, successText) {
  fetch(`https://neto-api.herokuapp.com/${path}`, {
    body: JSON.stringify(data),
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    if (200 <= res.status && res.status < 300) {
      return res;
    }
    throw new Error(res.statusText);
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      resultField.value = data.message;
    } else {
      resultField.value = `Пользователь ${data.name} успешно ${successText}`;
    }
  })
  .catch(console.log);
}
