const API_URL = "http://localhost:3000/prendas";

// Elementos del DOM
const list = document.getElementById("listaLibros");
const form = document.getElementById("formulario");
const btnCancel = document.getElementById("btnCancelar");
const formTitle = document.getElementById("tituloFormulario");

// Inputs del formulario
const nameInput = document.getElementById("nombre");
const descriptionInput = document.getElementById("descripcion");
const imageInput = document.getElementById("imagen");
const priceInput = document.getElementById("precio");
const discountInput = document.getElementById("descuento");
const colorInput = document.getElementById("color");
const genderInput = document.getElementById("genero");
const seasonInput = document.getElementById("temporada");
const typeInput = document.getElementById("tipo");
const releaseDateInput = document.getElementById("fecha_lanzamiento");
const styleInput = document.getElementById("estilo");

// Estado de edición
let editMode = false;
let editingId = null;

// Obtener prendas y mostrarlas (GET)
async function cargarPrendas() {
  list.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    const items = await res.json();

    items.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.nombre}</strong><br>
        ${item.descripcion || "Sin descripción"}<br>
        Precio: $${item.precio} (-${item.descuento}%)<br>
        Color: ${item.color} | Género: ${item.genero}<br>
        Temporada: ${item.temporada} | Tipo: ${item.tipo}<br>
        Estilo: ${item.estilo}
      `;

      const btnEdit = document.createElement("button");
      btnEdit.textContent = "✏️";
      btnEdit.addEventListener("click", () =>
        cargarPrendaEnFormulario(item.id)
      );

      const btnDelete = document.createElement("button");
      btnDelete.textContent = "🗑️";
      btnDelete.addEventListener("click", () => borrarPrenda(item.id));

      li.appendChild(btnEdit);
      li.appendChild(btnDelete);
      list.appendChild(li);
    });
  } catch (error) {
    alert("Error al cargar las prendas 😢");
    console.error(error);
  }
}

// Enviar formulario (POST o PUT)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const itemData = {
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
    if (editMode) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      alert("Prenda actualizada con éxito");
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      alert("Prenda agregada con éxito");
    }

    resetForm();
    cargarPrendas();
  } catch (error) {
    alert("❌ Error al guardar los datos");
    console.error(error);
  }
});

// Cargar prenda en el formulario para editar
async function cargarPrendaEnFormulario(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const item = await res.json();

    nameInput.value = item.nombre;
    descriptionInput.value = item.descripcion;
    imageInput.value = item.imagen;
    priceInput.value = item.precio;
    discountInput.value = item.descuento;
    colorInput.value = item.color;
    genderInput.value = item.genero;
    seasonInput.value = item.temporada;
    typeInput.value = item.tipo;
    releaseDateInput.value = item.fecha_lanzamiento;
    styleInput.value = item.estilo;

    editMode = true;
    editingId = id;
    formTitle.textContent = "Editar prenda";
  } catch (error) {
    alert("⚠️ Error al cargar la prenda");
    console.error(error);
  }
}

// Borrar prenda (DELETE)
async function borrarPrenda(id) {
  const confirmacion = confirm(
    "¿Estás seguro de que quieres eliminar esta prenda?"
  );
  if (!confirmacion) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    alert("Prenda eliminada");
    cargarPrendas();
  } catch (error) {
    alert("❌ No se pudo eliminar");
    console.error(error);
  }
}

// Resetear formulario
function resetForm() {
  form.reset();
  editMode = false;
  editingId = null;
  formTitle.textContent = "Agregar prenda";
}

// Botón cancelar
btnCancel.addEventListener("click", resetForm);

// Iniciar app
cargarPrendas();

{

}