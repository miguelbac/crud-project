document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('containerProducts');
    if (!container) return;

    container.addEventListener('click', function (event) {
        const card = event.target.closest('.productShow');
        if (card && container.contains(card)) {
            // Витягуємо назву товару з alt картинки
            const img = card.querySelector('img');
            const productName = img ? img.alt : null;
            if (!productName) return;

            // Отримати всі продукти, знайти id по імені
            fetch('http://localhost:3000/products')
                .then(res => res.json())
                .then(products => {
                    const product = products.find(p => p.nombre === productName);
                    if (product && product.id) {
                        window.location.href = "../pages/productView.html?id=" + encodeURIComponent(product.id);
                    }
                });
        }
    });
});


// Функція для отримання id товару з URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function renderProduct(product) {
    if (!product) return;

    document.getElementById('product-name').textContent = product.nombre;
    document.getElementById('precio-actual').textContent = product.precio + ' €';

    // Знижка
    const precioOriginal = document.getElementById('precio-original');
    const discountEl = document.getElementById('discount');
    if (product.descuento && product.descuento > 0) {
        const oldPrice = (product.precio / (1 - product.descuento / 100)).toFixed(2);
        precioOriginal.textContent = oldPrice + ' €';
        precioOriginal.style.display = '';
        discountEl.textContent = `-${product.descuento}%`;
        discountEl.style.display = '';
    } else {
        precioOriginal.style.display = 'none';
        discountEl.style.display = 'none';
    }

    document.getElementById('description').textContent = product.descripcion;
    document.getElementById('color').textContent = product.color;

    // Зображення
    const imagesLayout = document.getElementById('grid-images-layout');
    imagesLayout.innerHTML = '';
    if (product.imagen && product.imagen.length) {
        product.imagen.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = product.nombre;
            imagesLayout.appendChild(img);
        });
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        document.body.innerHTML = "<p>❌ No se proporcionó ID de producto.</p>";
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) {
            document.body.innerHTML = "<p>🚫 Producto no encontrado.</p>";
            return;
        }
        const producto = await response.json();

        document.title = producto.nombre || "Producto";
        document.getElementById("product-name").textContent = producto.nombre || "";
        document.getElementById("description").textContent = producto.descripcion || "";

        // Зображення (кілька)
        const imagesLayout = document.getElementById("grid-images-layout");
        imagesLayout.innerHTML = "";
        if (producto.imagen && Array.isArray(producto.imagen)) {
            producto.imagen.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.alt = producto.nombre;
                imagesLayout.appendChild(img);
            });
        }

        // Ціна та знижка
        document.getElementById("precio-actual").textContent = producto.precio ? producto.precio.toFixed(2) + " €" : "";
        const oldPriceEl = document.getElementById("precio-original");
        const discountEl = document.getElementById("discount");
        if (producto.descuento && producto.descuento > 0) {
            const oldPrice = (producto.precio / (1 - producto.descuento / 100)).toFixed(2);
            oldPriceEl.textContent = oldPrice + " €";
            oldPriceEl.style.display = "";
            discountEl.textContent = `-${producto.descuento}%`;
            discountEl.style.display = "";
        } else {
            oldPriceEl.style.display = "none";
            discountEl.style.display = "none";
        }

    } catch (error) {
        console.error("❗ Error al cargar el producto:", error);
        document.body.innerHTML = "<p>💥 Error al cargar los datos.</p>";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const btnAddToCart = document.getElementById("add-to-cart");
    const cartCount = document.getElementById("cart-count");

    // Inicializa contador al cargar la página
    updateCartCount();

    btnAddToCart.addEventListener("click", () => {
        // Simula datos del producto desde el DOM
        const product = {
            id: Date.now(), // puedes usar el ID real si tienes
            name: document.getElementById("product-name").textContent,
            price: parseFloat(document.getElementById("precio-actual").textContent),
            quantity: 1
        };

        addToCart(product);
        updateCartCount();
        alert("Producto añadido al carrito");
    });

    function addToCart(product) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Verifica si ya está en el carrito
        const existing = cart.find(p => p.name === product.name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
});
