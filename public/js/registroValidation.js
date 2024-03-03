// validation.js

function validateForm() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let confirmPasswordError = document.getElementById("confirmPasswordError");

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Las contraseñas no coinciden";
        return false;
    } else {
        confirmPasswordError.textContent = "";
    }

    let firstName = document.getElementById("firstName").value;
    let firstNameError = document.getElementById("firstNameError");

    if (firstName.trim() === "" || firstName.length < 3) {
        firstNameError.textContent = "El nombre no puede estar vacío y debe tener al menos 3 letras";
        return false;
    } else {
        firstNameError.textContent = "";
    }

    let lastName = document.getElementById("lastName").value;
    let lastNameError = document.getElementById("lastNameError");

    if (lastName.trim() === "" || lastName.length < 3) {
        lastNameError.textContent = "El apellido no puede estar vacío y debe tener al menos 3 letras";
        return false;
    } else {
        lastNameError.textContent = "";
    }

    let email = document.getElementById("email").value;
    let emailError = document.getElementById("emailError");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailError.textContent = "Ingrese un correo electrónico válido";
        return false;
    } else {
        emailError.textContent = "";
    }

    let image = document.getElementById("image");
    let imageError = document.getElementById("imageError");
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (image.value.trim() !== "" && !allowedExtensions.exec(image.value)) {
        imageError.textContent = "La imagen debe ser de tipo JPG, JPEG, PNG o GIF";
        return false;
    } else {
        imageError.textContent = "";
    }


    return true;
}
