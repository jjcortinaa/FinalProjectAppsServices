document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("search-btn").addEventListener("click", function(event) {
        event.preventDefault(); 

        let searchTerm = document.getElementById("search-bar").value.trim().toLowerCase();
        if (searchTerm) {
            window.location.href = `../resultado_subasta/resultado.html?search=${encodeURIComponent(searchTerm)}`;
        }
    });
});
