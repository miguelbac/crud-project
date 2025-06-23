async function searchProducts(searchText) {
    const container = document.getElementById('containerProducts');
    try {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();

        const searchTxt = searchText.toLowerCase();

        const results = products.filter(p =>
            (p.nombre && p.nombre.toLowerCase().includes(searchTxt)) ||
            (p.genero && p.genero.toLowerCase().includes(searchTxt)) ||
            (p.temporada && p.temporada.toLowerCase().includes(searchTxt)) ||
            (p.estilo && p.estilo.toLowerCase().includes(searchTxt))
        );

        if (!results || !results.length) {
            container.innerHTML = "<p>No hay productos que coincidan con la búsqueda.</p>";
            return;
        }

        let html = "";

        for (const product of results) {
            const image = product.imagen && product.imagen.length > 0
                ? product.imagen[1]
                : "img/sin-imagen.jpg";

            html += `
                <div class="productShow">
                    <img src="${image}" alt="${product.nombre}" width="150">
                    <h3>${product.nombre}</h3>
                    <p>${product.descripcion}</p>
                    <p><strong>Price:</strong> €${product.precio}</p>
                </div>
            `;
        }

        container.innerHTML = html;
    }
    catch (error) {
        container.innerHTML = `<p>Error loading products: ${error.message}</p>`;
    }
}

async function loadAndDisplayProducts(filter = "all") {
    const container = document.getElementById('containerProducts');
    let url = 'http://localhost:3000/products';

    switch (filter) {
        case "Mujer":
            url = 'http://localhost:3000/products?genero=Mujer';
            break;
        case "Hombre":
            url = 'http://localhost:3000/products?genero=Hombre';
            break;
        case "Invierno":
            url = 'http://localhost:3000/products?temporada=Invierno';
            break;
        case "Verano":
            url = 'http://localhost:3000/products?temporada=Verano';
            break;
        case "Otoño":
            url = 'http://localhost:3000/products?temporada=Otoño';
            break;
        case "Primavera":
            url = 'http://localhost:3000/products?temporada=Primavera';
            break;
        case "Casual":
            url = 'http://localhost:3000/products?estilo=Casual';
            break;
        case "Formal":
            url = 'http://localhost:3000/products?estilo=Formal';
            break;
        case "Deportivo":
            url = 'http://localhost:3000/products?estilo=Deportivo';
            break;
        default:
            // Mantiene la URL original sin filtros
            break;
    }
    try {
        const response = await fetch(url);
        const products = await response.json();

        if (!products || !products.length) {
            container.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        let html = "";

        for (const product of products) {
            const image = product.imagen && product.imagen.length > 0
                ? product.imagen[1]
                : "img/sin-imagen.jpg";

            html += `
                <div class="productShow">
                    <img src="${image}" alt="${product.nombre}" width="150">
                    <h3>${product.nombre}</h3>
                    <p>${product.descripcion}</p>
                    <p><strong>Price:</strong> €${product.precio}</p>
                </div>
            `;
        }

        container.innerHTML = html;

    } catch (error) {
        container.innerHTML = `<p>Error loading products: ${error.message}</p>`;
    }
}

//document.addEventListener('DOMContentLoaded', loadAndDisplayProducts("Mujer"));//llamada con parametro para filtrar

document.addEventListener('DOMContentLoaded', loadAndDisplayProducts);

//cuando se da en Buscar
const btnSearch = document.getElementById("searchButton");

btnSearch.addEventListener("click", () => {
    const searchValue = document.getElementById("searchText").value.trim();

    if (searchValue === "") {
        alert("Por favor ingresa un término de búsqueda.");
        return;
    }
    searchProducts(searchValue);
});