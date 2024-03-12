// formValidation.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (event) {
      if (!validateForm()) {
        event.preventDefault(); // Evitar que el formulario se envíe si la validación falla
      }
    });
  
    function validateForm() {
      const nameInput = document.getElementById("name");
      const descriptionInput = document.getElementById("description");
      const imageInput = document.getElementById("image");
  
      // Limpiar mensajes de validación anteriores
      clearValidationMessages();
  
      // Validar el nombre
      if (nameInput.value.length < 5) {
        showValidationMessage(nameInput, "El nombre debe tener al menos 5 caracteres.");
        return false;
      }
  
      // Validar la descripción
      if (descriptionInput.value.length < 20) {
        showValidationMessage(descriptionInput, "La descripción debe tener al menos 20 caracteres.");
        return false;
      }
  
      // Validar el formato de la imagen (si se proporciona)
      if (imageInput.value && !/\.(jpg|jpeg|png|gif)$/i.test(imageInput.value)) {
        showValidationMessage(imageInput, "Formato de imagen no válido. Utiliza JPG, JPEG, PNG o GIF.");
        return false;
      }
  
      // Si todos los campos pasan la validación
      return true;
    }
  
    function showValidationMessage(input, message) {
      const small = document.createElement("small");
      small.textContent = message;
      small.className = "validation-message";
      input.parentNode.appendChild(small);
    }
  
    function clearValidationMessages() {
      const validationMessages = document.querySelectorAll(".validation-message");
      validationMessages.forEach((message) => message.remove());
    }
  });
  