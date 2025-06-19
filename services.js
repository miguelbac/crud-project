const API_URL = "http://localhost:3000/products";

// DOM elements
const itemList = document.getElementById("itemList");
const form = document.getElementById("form");
const btnCancel = document.getElementById("btnCancel");
const formTitle = document.getElementById("formTitle");

// Form inputs
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("image");
const priceInput = document.getElementById("price");
const discountInput = document.getElementById("discount");
const colorInput = document.getElementById("color");
const genderInput = document.getElementById("gender");
const seasonInput = document.getElementById("season");
const typeInput = document.getElementById("type");
const releaseDateInput = document.getElementById("release_date");
const styleInput = document.getElementById("style");

// Edit state
let isEditMode = false;
let editingId = null;

// Fetch and display products (GET)
async function loadProducts() {
  itemList.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    const products = await res.json();

    products.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${product.name}</strong><br>
        ${product.description || "Sin descripción"}<br>
        Precio: $${product.price} (-${product.discount}%)<br>
        Color: ${product.color} | Género: ${product.gender}<br>
        Temporada: ${product.season} | Tipo: ${product.category}<br>
        Estilo: ${product.style}
      `;

      const btnEdit = document.createElement("button");
      btnEdit.textContent = "✏️";
      btnEdit.addEventListener("click", () =>
        loadProductIntoForm(product.id)
      );

      const btnDelete = document.createElement("button");
      btnDelete.textContent = "🗑️";
      btnDelete.addEventListener("click", () => deleteProduct(product.id));

      li.appendChild(btnEdit);
      li.appendChild(btnDelete);
      itemList.appendChild(li);
    });
  } catch (error) {
    alert("Error al cargar las prendas 😢");
    console.error(error);
  }
}

// Handle form submit (POST or PUT)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const productData = {
    nombre: nameInput.value,
    descripcion: descriptionInput.value,
    imagen: imageInput.value,
    precio: parseFloat(priceInput.value),
    descuento: parseInt(discountInput.value),
    color: colorInput.value,
    genero: genderInput.value,
    temporada: seasonInput.value,
    tipo: typeInput.value,
    fecha_lanzamiento: releaseDateInput.value,
    estilo: styleInput.value,
  };

  try {
    if (isEditMode) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      alert("Prenda actualizada con éxito");
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      alert("Prenda agregada con éxito");
    }

    resetForm();
    loadProducts();
  } catch (error) {
    alert("❌ Error al guardar los datos");
    console.error(error);
  }
});

// Load product into form for editing
async function loadProductIntoForm(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const product = await res.json();

    nameInput.value = product.nombre;
    descriptionInput.value = product.descripcion;
    imageInput.value = product.imagen;
    priceInput.value = product.precio;
    discountInput.value = product.descuento;
    colorInput.value = product.color;
    genderInput.value = product.genero;
    seasonInput.value = product.temporada;
    typeInput.value = product.tipo;
    releaseDateInput.value = product.fecha_lanzamiento;
    styleInput.value = product.estilo;

    isEditMode = true;
    editingId = id;
    formTitle.textContent = "Editar prenda";
  } catch (error) {
    alert("⚠️ Error al cargar la prenda");
    console.error(error);
  }
}

// Delete product (DELETE)
async function deleteProduct(id) {
  const confirmation = confirm("¿Estás seguro de que quieres eliminar esta prenda?");
  if (!confirmation) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    alert("Prenda eliminada");
    loadProducts();
  } catch (error) {
    alert("❌ No se pudo eliminar");
    console.error(error);
  }
}

// Reset form
function resetForm() {
  form.reset();
  isEditMode = false;
  editingId = null;
  formTitle.textContent = "Agregar prenda";
}

// Cancel button
btnCancel.addEventListener("click", resetForm);

// Start app
loadProducts();
