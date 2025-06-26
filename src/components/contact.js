 //Cargar mapa de google 
 
 function initMap() {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 43.5287988, lng: -5.6643789 }
      });
      const marker = new google.maps.Marker({
        position: {lat: 43.5287988, lng: -5.6643789},
        map: map
      });
    }

    document.querySelectorAll('.link-hover').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        window.location.href = `../pages/ProductsShow.html?id=${id}`;
    });
});