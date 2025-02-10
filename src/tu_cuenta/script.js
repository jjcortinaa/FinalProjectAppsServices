function validate_password(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    let contrasena = document.getElementById("password").value;
    let contrasena_confirm = document.getElementById("password_confirm").value;
    let error_message = document.getElementById("error_message");
    let birthdate = document.getElementById("birthdate").value;

    let errorText = "";

    // Validar que la contraseña no esté vacía
    if (contrasena === "") {
        errorText += "La contraseña no puede estar vacía.\n";
    }

    // Validar que la contraseña tenga al menos 8 caracteres
    if (contrasena.length < 8) {
        errorText += "La contraseña debe tener al menos 8 caracteres.\n";
    }

    // Validar que las contraseñas coincidan
    if (contrasena !== contrasena_confirm) {
        errorText += "Las contraseñas no coinciden.\n";
    }

    // Validar edad (mínimo 18 años)
    if (birthdate) {
        const birthDateObj = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        if (age < 18) {
            errorText += "Debes tener al menos 18 años para registrarte.\n";
        }
    } else {
        errorText += "Debes ingresar tu fecha de nacimiento.\n";
    }

    // Mostrar errores o enviar el formulario
    if (errorText !== "") {
        error_message.textContent = errorText;
    } else {
        error_message.textContent = "";
        document.getElementById("register_form").submit();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("register_form").addEventListener("submit", validate_password);
});


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("comunidad").addEventListener("change", actualizarProvincia);
});

function actualizarProvincia() {
    const comunidad = document.getElementById("comunidad").value;
    const provinciaSelect = document.getElementById("provincia");

    // Mapa de provincias (2 por comunidad excepto las uniprovinciales)
    const provincias = {
        "Andalucía": ["Sevilla", "Málaga"],
        "Aragón": ["Zaragoza", "Huesca"],
        "Asturias": ["Oviedo"], // Uniprovincial
        "Baleares": ["Palma de Mallorca"], // Uniprovincial
        "Canarias": ["Las Palmas", "Santa Cruz de Tenerife"],
        "Cantabria": ["Santander"], // Uniprovincial
        "Castilla-La Mancha": ["Toledo", "Albacete"],
        "Castilla y León": ["Valladolid", "León"],
        "Cataluña": ["Barcelona", "Tarragona"],
        "Extremadura": ["Badajoz", "Cáceres"],
        "Galicia": ["A Coruña", "Lugo"],
        "Madrid": ["Madrid"], // Uniprovincial
        "Murcia": ["Murcia"], // Uniprovincial
        "Navarra": ["Pamplona"], // Uniprovincial
        "La Rioja": ["Logroño"], // Uniprovincial
        "País Vasco": ["Vizcaya", "Gipuzcua"],
        "Valencia": ["Valencia", "Alicante"],
        "Ceuta": ["Ceuta"], // Uniprovincial
        "Melilla": ["Melilla"] // Uniprovincial
    };

    // Limpiar opciones previas
    provinciaSelect.innerHTML = "";

    // Si hay una comunidad seleccionada, actualizar provincias
    if (provincias[comunidad]) {
        provincias[comunidad].forEach(provincia => {
            let option = document.createElement("option");
            option.value = provincia;
            option.textContent = provincia;
            provinciaSelect.appendChild(option);
        });
    } else {
        // Si no hay comunidad seleccionada, dejar el placeholder
        let option = document.createElement("option");
        option.value = "";
        option.textContent = "Selecciona una comunidad primero";
        option.disabled = true;
        option.selected = true;
        provinciaSelect.appendChild(option);
    }
}