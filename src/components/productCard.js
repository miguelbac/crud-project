
const container = document.getElementById('containerProducts');
const resultsNumber = document.getElementById('ResultsNumber');

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

async function searchProducts(searchText) {

    try {
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();

        const searchTxt = normalizeText(searchText);

        const results = products.filter(p =>
            (p.nombre && normalizeText(p.nombre).includes(searchTxt)) ||
            (p.genero && normalizeText(p.genero).includes(searchTxt)) ||
            (p.temporada && normalizeText(p.temporada).includes(searchTxt)) ||
            (p.tipo && normalizeText(p.tipo).includes(searchTxt)) ||
            (p.fecha_lanzamiento && normalizeText(p.fecha_lanzamiento).includes(searchTxt)) ||
            (p.estilo && normalizeText(p.estilo).includes(searchTxt))
        );

        paintCards(results);
    }
    catch (error) {
        container.innerHTML = `<p>Error loading products: ${error.message}</p>`;

    }
}

async function loadAndDisplayProducts(filter = "all") {

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
        case "Negro":
            url = 'http://localhost:3000/products?color=Negro';
            break;
        case "Blanco":
            url = 'http://localhost:3000/products?color=Blanco';
            break;
        case "Azul":
            url = 'http://localhost:3000/products?color=Azul';
            break;
        case "Rojo":
            url = 'http://localhost:3000/products?color=Rojo';
            break;
        case "Gris":
            url = 'http://localhost:3000/products?color=Gris';
            break;
        case "Beige":
            url = 'http://localhost:3000/products?color=Beige';
            break;
        case "Amarillo":
            url = 'http://localhost:3000/products?color=Amarillo';
            break;
        case "Verde":
            url = 'http://localhost:3000/products?color=Verde';
            break;
        case "Rosa":
            url = 'http://localhost:3000/products?color=Rosa';
            break;
        default:
            // Mantiene la URL original sin filtros
            break;
    }
    try {
        const response = await fetch(url);
        const products = await response.json();

        paintCards(products);

    } catch (error) {
        container.innerHTML = `<p>Error loading products: ${error.message}</p>`;

    }
}

function paintCards(products) {

    if (!products || !products.length) {
        container.innerHTML = "<p>No hay productos disponibles.</p>";
        resultsNumber.textContent = "0 Resultados";
        return;
    }
    total = products.length;
    resultsNumber.textContent = `${total} Resultados`;
    let html = "";

    for (const product of products) {
        const image = product.imagen && product.imagen.length > 0
            ? product.imagen[1]
            : "/img/sin-imagen.png";

        html += `
                <div class="productShow">
                    <img src="${image}" alt="${product.nombre}" width="150">
                    <h4>${product.nombre}</h4>
                    
                    <p><strong>Precio:</strong> €${product.precio}</p>
                    ${product.descuento > 0
                ? `<p style="color: red;"><strong>Descuento:</strong> ${product.descuento}%</p>`
                : ''
            }
                </div>
            `;
    }

    container.innerHTML = html;
}
//document.addEventListener('DOMContentLoaded', loadAndDisplayProducts("Mujer"));//llamada con parametro para filtrar

//document.addEventListener('DOMContentLoaded', loadAndDisplayProducts);
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const valor = this.dataset.text;
        loadAndDisplayProducts(valor);
    });
});

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