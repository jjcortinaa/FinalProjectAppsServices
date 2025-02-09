document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get("search");

    let auctions = document.querySelectorAll(".reloj"); // Asegura que seleccionamos solo los artículos de subasta

    if (searchTerm) {
        auctions.forEach(auction => {
            let auctionClasses = auction.className.toLowerCase(); // Obtiene las clases del artículo
            if (auctionClasses.includes(searchTerm.toLowerCase())) {
                auction.style.display = "block"; // Muestra los que coinciden
            } else {
                auction.style.display = "none"; // Oculta los que no coinciden
            }
        });
    } else {
        // Si no hay búsqueda, muestra todas las subastas
        auctions.forEach(auction => auction.style.display = "block");
    }
});
