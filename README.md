# 📚 Proyecto CRUD con JSON Server – Mini Biblioteca

## ✨ Objetivo del Proyecto

En este proyecto crearás una pequeña aplicación web que permite **gestionar una lista de libros**: agregarlos, verlos, editarlos y eliminarlos. Usarás JavaScript puro (vanilla JS), HTML y CSS, junto con un servidor local simulado usando `json-server`.

Este ejercicio tiene como objetivo entender cómo funciona una **aplicación CRUD real**, cómo se comunican el frontend y el backend.

---

## 🛠️ Tecnologías utilizadas

- HTML y CSS
- JavaScript (sin frameworks)
- `json-server` (para simular un backend con una API REST)
- Git & GitHub para control de versiones

---

## 🚀 Funcionalidades del proyecto

- ✅ Ver lista de libros (`GET`)
- ➕ Agregar un nuevo libro (`POST`)
- ✏️ Editar libro existente (`PUT`)
- 🗑️ Eliminar libro (`DELETE`)
- 🧠 Cargar datos al formulario para editar
- 🔄 Recargar la lista tras cada acción
- 📦 Comunicación con el servidor mediante `fetch` y `async/await`

---

## 🧑‍💻 Instrucciones para comenzar

### 1. Clona este repositorio

```bash
git clone https://github.com/FactoriaF5-Asturias/p4-digital-academy-javascript-crud-api.git
cd p4-digital-academy-javascript-crud-api
```

### 2. Instala JSON Server

```bash
npm install -g json-server
```

### 3. Inicia el servidor local con nuestro script

```bash
npm run api
```

Esto creará una API en:
📍 `http://localhost:3000/libros`

### 4. Abre el archivo `index.html` en tu navegador

Puedes hacerlo con Live Server en VSCode o simplemente arrastrando el archivo al navegador.
