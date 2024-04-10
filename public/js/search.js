document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            // Aquí puedes enviar una solicitud al servidor con el término de búsqueda
            fetch(`/products/search?query=${encodeURIComponent(searchTerm)}`)
                .then(response => response.json())
                .then(data => {
                    // Manipular la respuesta del servidor, por ejemplo, renderizar los resultados
                    console.log(data);
                })
                .catch(error => console.error(error));
        }
    });
});