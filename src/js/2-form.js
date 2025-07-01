const form = document.querySelector('.feedback-form');
const savedData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};

form.elements.message.value = savedData.message ?? '';
form.elements.email.value = savedData.email ?? '';

const formData = { ...savedData };

form.addEventListener('input', function (e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (
    e.target.elements.message.value === '' ||
    e.target.elements.email.value === ''
  ) {
    alert('Please fill in all fields');
    return;
  }

  console.log({
    message: e.target.elements.message.value,
    email: e.target.elements.email.value,
  });

  localStorage.removeItem('feedback-form-state');

  formData.email = '';
  formData.message = '';

  form.reset();
});
