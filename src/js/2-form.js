'use strict';

const listenerForm = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: '',
};

const localDataKey = 'feedback-form-state';

function recordValue(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(localDataKey, JSON.stringify(formData));
}
function eventSubmit(event) {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    return alert('Fill please all fields');
  }
  console.log(formData);

  listenerForm.reset();

  formData.email = '';
  formData.message = '';

  localStorage.removeItem(localDataKey);
}
function loadData() {
  const savedData = localStorage.getItem(localDataKey);
  if (savedData) {
    try {
      const formDataNev = JSON.parse(savedData);
      formData.email = formDataNev.email || '';
      formData.message = formDataNev.message || '';
      listenerForm.elements.email.value = formData.email;
      listenerForm.elements.message.value = formData.message;
    } catch (error) {
      console.log('Error parsing localStorage data:', error);
    }
  }
}

loadData();
listenerForm.addEventListener('input', recordValue);
listenerForm.addEventListener('submit', eventSubmit);
