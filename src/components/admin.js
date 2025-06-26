// URLs base
const API_URL = "http://localhost:3000/products";

// Botones de acción
const btnAdd = document.getElementById("btnAdd");
const btnEdit = document.getElementById("btnEdit");
const btnDelete = document.getElementById("btnDelete");

// Formulario y campos
const form = document.getElementById("form");
const formTitle = document.getElementById("formTitle");
const btnCancel = document.getElementById("btnCancel");
const editId = document.getElementById("editId");

// 1. Mostrar formulario vacío para añadir
btnAdd.addEventListener("click", () => {
  form.reset();
  editId.value = "";
  formTitle.textContent = "Agregar prenda de ropa";
  form.classList.remove("hidden");
});

// 2. Mostrar formulario con datos cargados para editar
btnEdit.addEventListener("click", async () => {
  const id = prompt("Introduce el ID del producto a editar:");
  if (!id) return;

  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return alert("Producto no encontrado");

  const producto = await res.json();

  // Rellenar campos
  document.getElementById("name").value = producto.nombre || "";
  document.getElementById("description").value = producto.descripcion || "";
  document.getElementById("image").value = producto.imagen[0] || "";
  document.getElementById("price").value = producto.precio || "";
  document.getElementById("discount").value = producto.descuento || "";
  document.getElementById("color").value = producto.color || "";
  document.getElementById("gender").value = producto.genero || "";
  document.getElementById("season").value = producto.temporada || "";
  document.getElementById("type").value = producto.tipo || "";
  document.getElementById("release_date").value = producto.fecha_lanzamiento || "";
  document.getElementById("style").value = producto.estilo || "";
  editId.value = producto.id;

  formTitle.textContent = "Editar prenda de ropa";
  form.classList.remove("hidden");
});

// 3. Eliminar producto
btnDelete.addEventListener("click", async () => {
  const id = prompt("Introduce el ID del producto a eliminar:");
  if (!id) return;

  const confirmacion = confirm(`¿Seguro que quieres eliminar el producto con ID ${id}?`);
  if (!confirmacion) return;

  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (res.ok) {
    alert("Producto eliminado");
  } else {
    alert("No se pudo eliminar el producto");
  }
});

// 4. Cancelar edición/creación
btnCancel.addEventListener("click", () => {
  form.classList.add("hidden");
  form.reset();
  editId.value = "";
});

// 5. Enviar formulario para crear o editar
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: document.getElementById("name").value,
    descripcion: document.getElementById("description").value,
    imagen: [document.getElementById("image").value],
    precio: parseFloat(document.getElementById("price").value),
    descuento: parseInt(document.getElementById("discount").value),
    color: document.getElementById("color").value,
    genero: document.getElementById("gender").value,
    temporada: document.getElementById("season").value,
    tipo: document.getElementById("type").value,
    fecha_lanzamiento: document.getElementById("release_date").value,
    estilo: document.getElementById("style").value
  };

  const id = editId.value;

  const options = {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id ? { ...data, id } : data)
  };

  const url = id ? `${API_URL}/${id}` : API_URL;
  const res = await fetch(url, options);

  if (res.ok) {
    alert(id ? "Producto actualizado" : "Producto añadido");
    form.reset();
    form.classList.add("hidden");
    editId.value = "";
  } else {
    alert("Error al guardar el producto");
  }
});
