document.querySelectorAll('.link-hover').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        window.location.href = `../src/pages/ProductsShow.html?id=${id}`;
    });
});
/*
const searchBar = document.getElementById("searchText");
const searchButton = document.getElementById("searchButton");

const searchValue = searchBar.value.trim();
if (searchValue === "") {
    alert("Por favor ingresa un término de búsqueda.");
    return;

} else {
    searchButton.addEventListener("click", function (e) {
        e.preventDefault();

        window.location.href = `../src/pages/ProductsShow.html?search=${encodeURIComponent(searchValue)}`;
    });
}*/
const searchBar = document.getElementById("searchText");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function (e) {
    e.preventDefault();

    const searchValue = searchBar.value.trim();

    if (searchValue === "") {
        alert("Por favor ingresa un término de búsqueda.");
        return;
    }

    // Redirige a ProductsShow con el texto de búsqueda en la URL
    window.location.href = `../src/pages/ProductsShow.html?search=${encodeURIComponent(searchValue)}`;
});
