function validate_password(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    let contrasena = document.getElementById("password").value;
    let contrasena_confirm = document.getElementById("password_confirm").value;
    let error_message = document.getElementById("error_message");

    if (contrasena === "") {
        error_message.textContent = "La contraseña no puede estar vacía.";
        return false;
    }
    
    if (contrasena !== contrasena_confirm) {
        error_message.textContent = "Las contraseñas no coinciden.";
        return false;
    }
    
    error_message.textContent = "";
    document.getElementById("register_form").submit(); 
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("register_form").addEventListener("submit", validate_password);
}); 