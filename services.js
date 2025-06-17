const API_URL = "http://localhost:3000/libros";

// Elementos del DOM
const lista = document.getElementById("listaLibros");
const formulario = document.getElementById("formulario");
const btnCancelar = document.getElementById("btnCancelar");
const tituloFormulario = document.getElementById("tituloFormulario");

// Inputs del formulario
const nombre = document.getElementById("nombre");
const autor = document.getElementById("autor");

// Estado de edición
let modoEdicion = false;
let idEditando = null;

// Obtener libros y mostrarlos (GET)
async function cargarLibros() {
  lista.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    const libros = await res.json();

    libros.forEach((libro) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${libro.nombre}</strong> | ${libro.autor} 
      `;

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "✏️";
      btnEditar.addEventListener("click", () =>
        cargarLibroEnFormulario(libro.id)
      );

      const btnBorrar = document.createElement("button");
      btnBorrar.textContent = "🗑️";
      btnBorrar.addEventListener("click", () => borrarLibro(libro.id));

      li.appendChild(btnEditar);
      li.appendChild(btnBorrar);
      lista.appendChild(li);
    });
  } catch (error) {
    alert("Error al cargar los libros 😢");
    console.error(error);
  }
}

// Enviar formulario (POST o PUT)
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const datosLibro = {
    nombre: nombre.value,
    autor: autor.value,
  };

  try {
    if (modoEdicion) {
      await fetch(`${API_URL}/${idEditando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosLibro),
      });
      alert("Libro actualizado con éxito");
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosLibro),
      });
      alert("Libro agregado con éxito");
    }

    resetearFormulario();
    cargarLibros();
  } catch (error) {
    alert("❌ Error al guardar los datos");
    console.error(error);
  }
});

// Cargar libro en el formulario para editar
async function cargarLibroEnFormulario(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const libro = await res.json();

    nombre.value = libro.nombre;
    autor.value = libro.autor;

    modoEdicion = true;
    idEditando = id;
    tituloFormulario.textContent = "Editar libro";
  } catch (error) {
    alert("⚠️ Error al cargar el libro");
    console.error(error);
  }
}

// Borrar libro (DELETE)
async function borrarLibro(id) {
  const confirmacion = confirm(
    "¿Estás segura de que quieres eliminar este libro?"
  );
  if (!confirmacion) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    alert("Libro eliminado");
    cargarLibros();
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
  tituloFormulario.textContent = "Agregar libro";
}

// Botón cancelar
btnCancelar.addEventListener("click", resetearFormulario);

// Iniciar app
cargarLibros();
