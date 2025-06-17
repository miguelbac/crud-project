const API_URL = "http://localhost:3000/prendas";

// Elementos del DOM
const lista = document.getElementById("listaLibros");
const formulario = document.getElementById("formulario");
const btnCancelar = document.getElementById("btnCancelar");
const tituloFormulario = document.getElementById("tituloFormulario");

// Inputs del formulario
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const imagen = document.getElementById("imagen");
const precio = document.getElementById("precio");
const descuento = document.getElementById("descuento");
const color = document.getElementById("color");
const genero = document.getElementById("genero");
const temporada = document.getElementById("temporada");
const tipo = document.getElementById("tipo");
const fecha_lanzamiento = document.getElementById("fecha_lanzamiento");
const estilo = document.getElementById("estilo");

// Estado de edición
let modoEdicion = false;
let idEditando = null;

// Obtener prendas y mostrarlas (GET)
async function cargarPrendas() {
  lista.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    const prendas = await res.json();

    prendas.forEach((prenda) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${prenda.nombre}</strong><br>
        ${prenda.descripcion || "Sin descripción"}<br>
        Precio: $${prenda.precio} (-${prenda.descuento}%)<br>
        Color: ${prenda.color} | Género: ${prenda.genero}<br>
        Temporada: ${prenda.temporada} | Tipo: ${prenda.tipo}<br>
        Estilo: ${prenda.estilo}
      `;

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "✏️";
      btnEditar.addEventListener("click", () =>
        cargarPrendaEnFormulario(prenda.id)
      );

      const btnBorrar = document.createElement("button");
      btnBorrar.textContent = "🗑️";
      btnBorrar.addEventListener("click", () => borrarPrenda(prenda.id));

      li.appendChild(btnEditar);
      li.appendChild(btnBorrar);
      lista.appendChild(li);
    });
  } catch (error) {
    alert("Error al cargar las prendas 😢");
    console.error(error);
  }
} 

// Enviar formulario (POST o PUT)
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datosPrenda = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    imagen: imagen.value,
    precio: parseFloat(precio.value),
    descuento: parseInt(descuento.value),
    color: color.value,
    genero: genero.value,
    temporada: temporada.value,
    tipo: tipo.value,
    fecha_lanzamiento: fecha_lanzamiento.value,
    estilo: estilo.value,
  };

  try {
    if (modoEdicion) {
      await fetch(`${API_URL}/${idEditando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosPrenda),
      });
      alert("Prenda actualizada con éxito");
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosPrenda),
      });
      alert("Prenda agregada con éxito");
    }

    resetearFormulario();
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
    const prenda = await res.json();

    nombre.value = prenda.nombre;
    descripcion.value = prenda.descripcion;
    imagen.value = prenda.imagen;
    precio.value = prenda.precio;
    descuento.value = prenda.descuento;
    color.value = prenda.color;
    genero.value = prenda.genero;
    temporada.value = prenda.temporada;
    tipo.value = prenda.tipo;
    fecha_lanzamiento.value = prenda.fecha_lanzamiento;
    estilo.value = prenda.estilo;

    modoEdicion = true;
    idEditando = id;
    tituloFormulario.textContent = "Editar prenda";
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
function resetearFormulario() {
  formulario.reset();
  modoEdicion = false;
  idEditando = null;
  tituloFormulario.textContent = "Agregar prenda";
}

// Botón cancelar
btnCancelar.addEventListener("click", resetearFormulario);

// Iniciar app
cargarPrendas();

{
  
}