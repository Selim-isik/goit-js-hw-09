const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const loadFormData = () => {
  const savedData = localStorage.getItem(storageKey);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';
      emailInput.value = formData.email;
      messageInput.value = formData.message;
    } catch (error) {
      console.error('Failed to parse saved form data', error);
    }
  }
};

const saveFormData = () => {
  formData.email = emailInput.value.trim();
  formData.message = messageInput.value.trim();

  localStorage.setItem(storageKey, JSON.stringify(formData));
};

const handleSubmit = event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Please fill in both email and message fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(storageKey);

  form.reset();

  formData.email = '';
  formData.message = '';
};

loadFormData();

form.addEventListener('input', saveFormData);
form.addEventListener('submit', handleSubmit);
