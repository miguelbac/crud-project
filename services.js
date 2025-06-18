const API_URL = "http://localhost:3000/clothes";

// DOM Elements
const list = document.getElementById("bookList");
const form = document.getElementById("form");
const btnCancel = document.getElementById("btnCancel");
const formTitle = document.getElementById("formTitle");

// Form inputs
const nameInput = document.getElementById("name");
const authorInput = document.getElementById("author");

// Edit state
let editMode = false;
let editingId = null;

// Get clothes and display them (GET)
async function loadClothes() {
  list.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    const clothes = await res.json();

    clothes.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.name}</strong> | ${item.description || "No description"}
      `;

      const btnEdit = document.createElement("button");
      btnEdit.textContent = "✏️";
      btnEdit.addEventListener("click", () =>
        loadClothingToForm(item.id)
      );

      const btnDelete = document.createElement("button");
      btnDelete.textContent = "🗑️";
      btnDelete.addEventListener("click", () => deleteClothing(item.id));

      li.appendChild(btnEdit);
      li.appendChild(btnDelete);
      list.appendChild(li);
    });
  } catch (error) {
    alert("Error loading clothes 😢");
    console.error(error);
  }
}

// Submit form (POST or PUT)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const clothingData = {
    name: nameInput.value,
    author: authorInput.value,
  };

  try {
    if (editMode) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clothingData),
      });
      alert("Clothing updated successfully");
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clothingData),
      });
      alert("Clothing added successfully");
    }

    resetForm();
    loadClothes();
  } catch (error) {
    alert("❌ Error saving data");
    console.error(error);
  }
});

// Load clothing into form for editing
async function loadClothingToForm(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const item = await res.json();

    nameInput.value = item.name;
    authorInput.value = item.author;

    editMode = true;
    editingId = id;
    formTitle.textContent = "Edit clothing";
  } catch (error) {
    alert("⚠️ Error loading clothing");
    console.error(error);
  }
}

// Delete clothing (DELETE)
async function deleteClothing(id) {
  const confirmation = confirm(
    "Are you sure you want to delete this clothing item?"
  );
  if (!confirmation) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    alert("Clothing deleted");
    loadClothes();
  } catch (error) {
    alert("❌ Could not delete");
    console.error(error);
  }
}

// Reset form
function resetForm() {
  form.reset();
  editMode = false;
  editingId = null;
  formTitle.textContent = "Add clothing";
}

// Cancel button
btnCancel.addEventListener("click", resetForm);

// Start app
loadClothes();
