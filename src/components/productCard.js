
async function loadAndDisplayProducts() {
    const container = document.getElementById('containerProducts');

    try {
        const response = await fetch('http://localhost:3000/products'); // JSON Server endpoint
        const products = await response.json();

        if (!products || !products.length) {
            container.innerHTML = "<p>No products available.</p>";
            return;
        }

        let html = "";

        for (const product of products) {
            const image = product.imagen && product.imagen.length > 0
                ? product.imagen[0]
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

// Auto-execute when page loads
document.addEventListener('DOMContentLoaded', loadAndDisplayProducts);
