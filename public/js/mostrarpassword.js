document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password");
    const togglePasswordButton = document.getElementById("togglePassword");
  
    togglePasswordButton.addEventListener("click", function() {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordButton.textContent = "Ocultar password";
      } else {
        passwordInput.type = "password";
        togglePasswordButton.textContent = "Mostrar password";
      }
    });
  });
  