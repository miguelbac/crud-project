function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");
    const totalDiv = document.getElementById("total");

    if (cart.length === 0) {
        container.innerHTML = "<p class='text-center text-gray-500'>Tu carrito está vacío.</p>";
        totalDiv.textContent = "Total: €0.00";
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        html += `
          <div class="flex justify-between items-center border-b pb-4">
            <div>
              <h2 class="text-lg font-medium">${item.name}</h2>
              <p class="text-sm text-gray-600">€${item.price.toFixed(2)} x ${item.quantity}</p>
              <p class="text-sm text-gray-500">Subtotal: €${subtotal.toFixed(2)}</p>
            </div>
            <button onclick="removeItem(${index})"
                    class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
              Eliminar
            </button>
          </div>
        `;
    });

    container.innerHTML = html;
    totalDiv.textContent = `Total: €${total.toFixed(2)}`;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Si hay más de uno, baja la cantidad, si no, lo quita
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function finalizarCompra() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Muestra el modal
    document.getElementById("modal").classList.remove("hidden");

    // Borra el carrito y redirige
    localStorage.removeItem("cart");

    setTimeout(() => {
        window.location.href = "../../public/index.html";
    }, 5000); // 5 segundos
}

function cerrarModal() {
    window.location.href = "../../public/index.html";
}

// Ejecuta loadCart al cargar la página
window.addEventListener("DOMContentLoaded", loadCart);