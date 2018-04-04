'use strict';


if (!localStorage.color) {
  fetch('https://neto-api.herokuapp.com/cart/colors')
    .then(response => {
      return response.text();
    })
    .then(text => {
      console.log(text);
      localStorage.color = text;
    })
    .catch(error => {
      console.log(error);
    });
}
if (!localStorage.sizes) {
  fetch('https://neto-api.herokuapp.com/cart/sizes')
    .then(response => {
      return response.text();
    })
    .then(text => {
      console.log(text);
      localStorage.sizes = text;
    })
    .catch(error => {
      console.log(error);
    });
}
if (!localStorage.cart) {
  fetch('https://neto-api.herokuapp.com/cart')
    .then(response => {
      return response.text();
    })
    .then(text => {
      console.log(text);
      localStorage.cart = text;
    })
    .catch(error => {
      console.log(error);
    });
}
let color, sizes;
try {
  color = JSON.parse(localStorage.color);
  sizes = JSON.parse(localStorage.sizes);
} catch (e) {
  console.log(new Error(e));
}

renderQuickCart(JSON.parse(localStorage.cart));

const sizeSwatch = document.querySelector('#sizeSwatch');
const colorSwatch = document.querySelector('#colorSwatch');

color.forEach(val => {
  let div = document.createElement('div');
  div.dataset.value = val.type;
  div.classList.add(val.type);
  div.classList.add('color', 'swatch-element');

  let divHead = document.createElement('div');
  divHead.classList.add('tooltip');
  divHead.textContent = val.title;

  let input = document.createElement('input');
  input.id = val.type;
  input.value = val.type;
  input.type = 'radio';
  input.name = 'color';
  if (val.type === 'red') {
    input.checked = true;
  }

  let label = document.createElement('label');
  label.setAttribute('for', val.type);

  let span = document.createElement('span');
  span.style.backgroundColor = val.code;

  let img = document.createElement('img');
  img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
  img.classList.add('crossed-out');

  if (val.isAvailable) {
    div.classList.add('available');

  } else {
    div.classList.add('soldout');
    input.disabled = true;
  }

  label.appendChild(span);
  label.appendChild(img);
  div.appendChild(divHead);
  div.appendChild(input);
  div.appendChild(label);

  colorSwatch.appendChild(div);
});

sizes.forEach(val => {
  const div = document.createElement('div');
  div.classList.add('swatch-element', 'plain', val.type);
  div.dataset.value = val.type;

  const input = document.createElement('input');
  input.id = val.type;
  input.value = val.type;
  input.type = 'radio';
  input.name = 'sizes';
  if (val.type === 'l') {
    input.checked = true;
  }

  const label = document.createElement('label');
  label.setAttribute('for', val.type);
  label.textContent = val.title;

  if (val.isAvailable) {
    div.classList.add('available');
  } else {
    div.classList.add('soldout');
    input.disabled = true;
  }

  const img = document.createElement('img');
  img.classList.add('crossed-out');
  img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';

  label.appendChild(img);
  div.appendChild(input);
  div.appendChild(label);
  sizeSwatch.appendChild(div);
});

document.querySelector('#AddToCart').addEventListener('click', actionCart);

function actionCart(e) {
  e.preventDefault();
  let path;
  if (e.target.classList.contains('remove')) {
    path = 'https://neto-api.herokuapp.com/cart/remove';
  } else {
    path = 'https://neto-api.herokuapp.com/cart';
  }

  const form = document.forms.AddToCartForm;
  let formData = new FormData(form);
  formData.append('productId', form.dataset.productId);
  fetch(path, {
    method: 'POST',
    body: formData
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
      localStorage.cart = JSON.stringify(json);
      renderQuickCart(json);
    })
    .catch(error => {
      console.log(error);
    });
}

function renderQuickCart(cart) {
  const quickCart = document.querySelector('#quick-cart');
  if (quickCart.children.length > 0) {
    const list = Array.from(quickCart.children);
    for (let item of list) {
      quickCart.removeChild(item);
    }
  }

  cart.forEach(val => {
    const divMain = document.createElement('div');
    divMain.classList.add('quick-cart-product', 'quick-cart-product-static');
    divMain.id = val.productId;

    const divWrap = document.createElement('div');
    divWrap.classList.add('quick-cart-product-wrap');

    const img = document.createElement('img');
    img.src = val.pic;
    img.title = val.title;

    const spanPrice = document.createElement('span');
    spanPrice.textContent = `$${val.price}.00`;
    spanPrice.classList.add('s1');
    spanPrice.style.backgroundColor = '#000';
    spanPrice.style.opacity = '0.5';

    const spanS2 = document.createElement('span');
    spanS2.classList.add('s2');

    const spanCount = document.createElement('span');
    spanCount.classList.add('count', 'hide', 'fadeUp');
    spanCount.id = val.productId;
    spanCount.textContent = val.quantity;

    const spanRemove = document.createElement('span');
    spanRemove.dataset.id = val.productId;
    spanRemove.classList.add('quick-cart-product-remove', 'remove');
    spanRemove.addEventListener('click', actionCart);

    divWrap.appendChild(img);
    divWrap.appendChild(spanPrice);
    divWrap.appendChild(spanS2);
    divMain.appendChild(divWrap);
    divMain.appendChild(spanCount);
    divMain.appendChild(spanRemove);
    quickCart.appendChild(divMain);
  });
  renderCart(cart, quickCart);
}

function renderCart(data, elem) {
  const a = document.createElement('a');
  a.classList.add('cart-ico');
  a.id = 'quick-cart-pay';
  if (data.length !== 0)
    a.classList.add('open');
  const spanWrap = document.createElement('span');

  const strong = document.createElement('strong');
  strong.classList.add('quick-cart-text');
  strong.innerHTML = 'Оформить заказ<br>';

  let sum = data.reduce((count, item) => {
    return count + item.price * item.quantity;
  }, 0);

  const spanSumm = document.createElement('span');
  spanSumm.id = 'quick-cart-price';
  spanSumm.textContent = `$${sum}.00`;

  spanWrap.appendChild(strong);
  spanWrap.appendChild(spanSumm);
  a.appendChild(spanWrap);
  elem.appendChild(a);
}
