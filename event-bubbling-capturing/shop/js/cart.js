'use strict';

function cart(event) {
  let currentItem = event.target;
  if (currentItem.classList.contains('add-to-cart')) {
    event.preventDefault();
    let item = {
      title: currentItem.getAttribute('data-title'),
      price: currentItem.getAttribute('data-price')
    }
    addToCart(item);
    event.stopPropagation();
  }
}
let tables = document.getElementsByClassName('items-list');
tables[0].addEventListener('click', cart);
