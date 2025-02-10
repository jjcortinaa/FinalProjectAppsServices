document.addEventListener("DOMContentLoaded", function () {
    const relojes = {
        "daytona": { nombre: "Rolex Cosmograph Daytona", precio: 35000, imagen: "../fotos/cosmograph.png" },
        "cartier": { nombre: "Cartier Santos", precio: 6500, imagen: "../fotos/cartier_santos.png" },
        "apple": { nombre: "Apple Watch", precio: 320, imagen: "../fotos/apple_watch.png" },
        "cr7": { nombre: "Jacob & Co. Flight of CR7", precio: 62800, imagen: "../fotos/cr7.png" },
        "nautilus": { nombre: "Patek Philippe Nautilus", precio: 150000, imagen: "../fotos/patek_nautilus.png" },
        "richard": { nombre: "Richard Mille RM35-02 Rafael Nadal", precio: 369000, imagen: "../fotos/richard.png" }
    };

    if (!sessionStorage.getItem("preciosRestablecidos")) {
        localStorage.clear(); 
        sessionStorage.setItem("preciosRestablecidos", "true"); 
    }

    const params = new URLSearchParams(window.location.search);
    const relojId = params.get("reloj");

    if (relojId && relojes[relojId]) {
        const reloj = relojes[relojId];

        document.getElementById("nombre-reloj").textContent = reloj.nombre;
        document.getElementById("imagen-reloj").src = reloj.imagen;


        let precioActual;
        if (localStorage.getItem(relojId)) {
            precioActual = parseInt(localStorage.getItem(relojId));
        } else {
            precioActual = reloj.precio;
        }

        document.getElementById("precio-reloj").textContent = "Precio actual: " + precioActual + " euros";

        document.getElementById("boton-pujar").addEventListener("click", function () {
            const cantidad = parseInt(document.getElementById("puja").value);
            const mensajePuja = document.getElementById("mensaje-puja");

            if (!cantidad || cantidad <= 0) {
                mensajePuja.textContent = "Introduce una cantidad válida.";
                mensajePuja.style.color = "red";
            } else if (cantidad <= precioActual) {
                mensajePuja.textContent = "La puja debe ser mayor al precio actual.";
                mensajePuja.style.color = "red";
            } else {
                precioActual = cantidad;
                localStorage.setItem(relojId, precioActual);
                document.getElementById("precio-reloj").textContent = "Precio actual: " + precioActual + " euros";
                mensajePuja.textContent = `Puja realizada por ${cantidad} euros. ¡Buena suerte!`;
                mensajePuja.style.color = "green";
            }
        });
    }
});