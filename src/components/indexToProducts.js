document.querySelectorAll('.link-hover').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        window.location.href = `../src/pages/ProductsShow.html?id=${id}`;
    });
});