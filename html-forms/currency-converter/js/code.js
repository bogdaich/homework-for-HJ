'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const loader = document.querySelector('#loader');
  const from = document.querySelector('#from');
  const to = document.querySelector('#to');
  const source = document.querySelector('#source');
  const resultElem = document.querySelector('#result');
  loader.classList.remove('hidden');

  let xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    'https://neto-api.herokuapp.com/currency'
  );
  xhr.send();
  xhr.addEventListener('load', function () {
    const content = document.querySelector('#content');
    let result;
    try {
      if (xhr.status !== 200)
        throw new Error(xhr.status);
      result = JSON.parse(xhr.responseText)
    } catch (e) {
      console.log(new Error(`Ошибка: ${e.message}`));
    }
    content.classList.remove('hidden');
    loader.classList.add('hidden');
    result.forEach(function (val) {
      const option = document.createElement('option');
      option.label = val.code;
      option.value = val.value;
      option.innerHTML = val.title;
      from.appendChild(option);
      to.appendChild(option.cloneNode(true));
    })
  });

  function convert() {
    let result = source.value * from.value / to.value;
    resultElem.innerHTML = `${(+source.value).toFixed(2)} ${from.selectedOptions[0].innerHTML} соответствует ${result.toFixed(2)} ${to.selectedOptions[0].innerHTML}`;
  }

  source.addEventListener('input', convert);
  from.addEventListener('change', convert);
  to.addEventListener('change', convert);
});
