const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const loadFormData = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      if (typeof parsedData.email === 'string') {
        formData.email = parsedData.email.trim();
        emailInput.value = formData.email;
      }
      if (typeof parsedData.message === 'string') {
        formData.message = parsedData.message.trim();
        messageInput.value = formData.message;
      }
    } catch (error) {
      console.error('Failed to parse saved form data:', error);
    }
  }
};

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Please fill in both the email and message fields.');
    return;
  }

  console.log({ email, message });

  localStorage.removeItem(STORAGE_KEY);
  form.reset();

  formData.email = '';
  formData.message = '';
});

loadFormData();
