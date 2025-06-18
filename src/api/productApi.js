// Todas las llamadas a la API: GET, POST, PUT, DELETE
const API_BASE = "http://localhost:3000/products";
let searchResults = [];

async function searchBase(field) {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (!searchInput) {
        alert('Por favor escribe un texto para buscar.');
        return;
    }

    const url = `${API_BASE}?${field}_like=${encodeURIComponent(searchInput)}`;

    try {
        const response = await fetch(url);
        const results = await response.json();
        searchResults = results;       // Guardamos los resultados en la variable 
        /**cambiar nombre de funcion cuando este hecha */
        paintCards(searchResults);     // Llamamos a la función que los pinta en pantalla 
    } catch (error) {
        console.error(`Error buscando por ${field}:`, error);
        document.getElementById('container').innerHTML = '<p>Error al realizar la búsqueda.</p>';
    }
}

document.getElementById('btnSearch').addEventListener('click', () => {
    searchBase('nombre'); // Puedes cambiar 'nombre' por 'categoria', 'genero', etc.
});