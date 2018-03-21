'use strict';
function main() {
  const form = document.querySelector('.contentform');
  const formFields = form.querySelectorAll('[name]');
  const zipField = form.querySelector('[name="zip"]');
  const submitBtn = form.querySelector('[type="submit"]');

  const output = document.querySelector('#output');
  const editBtn = output.querySelector('.button-contact');
  const outputFields = output.querySelectorAll('output');

  zipField.addEventListener('input', verifyZip);
  for(const formField of formFields) {
    formField.addEventListener('input', verifyForm);
  }
  form.addEventListener('submit', onsubmit);
  editBtn.addEventListener('click', editMessage);

  function verifyZip() {
    zipField.value = zipField.value.replace(/\D+/g, '');
  }

  function verifyForm() {
    for(const formField of formFields) {
      if(formField.value.length === 0) {
        submitBtn.disabled = true;
        return false;
      }
    }
    submitBtn.disabled = false;
    return true;
  }

  function onsubmit() {
    event.preventDefault();

    for(const formField of formFields) {
      const outputField = output.querySelector(`#${formField.name}`);
      if(outputField) {
        outputField.value = formField.value;
      }
    }

    form.classList.add('hidden');
    form.reset();
    output.classList.remove('hidden');
  }

  function editMessage() {
    for(const outputField of outputFields) {
      const formField = form.querySelector(`[name="${outputField.id}"]`);
      if(formField) {
        formField.value = outputField.value;
      }
    }
    verifyForm();

    output.classList.add('hidden');
    form.classList.remove('hidden');
  }
}

document.addEventListener("DOMContentLoaded", main);
