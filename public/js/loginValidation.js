document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login');
  
    loginForm.addEventListener('submit', function (event) {
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
  
      if (emailInput.value === '') {
        alert('El campo de correo electrónico es obligatorio.');
        event.preventDefault();
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        alert('Por favor, introduce un correo electrónico válido.');
        event.preventDefault();
        return;
      }
  
      if (passwordInput.value === '') {
        alert('El campo de contraseña es obligatorio.');
        event.preventDefault();
        return;
      }
    });
  });