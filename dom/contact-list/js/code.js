'use strict';
document.addEventListener('DOMContentLoaded', function () {

  const listElem = document.querySelector('.contacts-list');
  listElem.removeChild(document.querySelector('.contacts-list li'));

  try {
    const contacts = JSON.parse(loadContacts());
    contacts.forEach((val) => {
      let li = document.createElement('li');
      let strong = document.createElement('strong');
      li.dataset.email = val.email;
      li.dataset.phone = val.phone;
      strong.innerHTML = val.name;
      listElem.appendChild(li);
      li.appendChild(strong);
    });
  } catch (e) {
    console.log(new Error(e));
  }
});
