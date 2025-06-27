// components/cart-count.js

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity || 1; // Usa "1" si no tiene cantidad
    });

    const countElement = document.getElementById("cart-count");
    if (countElement) {
        countElement.textContent = totalItems;
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", updateCartCount);
