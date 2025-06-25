function initMap () {
    const ubicacion = { lat: 43.5287988, lng: -5.6643789 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: ubicacion
    });

    new google.maps.Marker({
        position: ubicacion,
        map: map,
        title: "Mi negocio"
    })
}