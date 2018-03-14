'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.getElementsByClassName('add');
  const cartCountElem = document.getElementById('cart-count');
  const cartTotalElem = document.getElementById('cart-total-price');
  let cartCount = 0;
  let cartTotal = 0;

  for(let button of buttons) {
    button.addEventListener('click', function (e) {
      let price = parseFloat(this.dataset.price);
      cartTotal += price;
      cartCount++;
      cartTotalElem.innerHTML = getPriceFormatted(cartTotal);
      cartCountElem.innerHTML = cartCount;
    });
  }
});
