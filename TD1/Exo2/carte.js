var nice = [43.7009, 7.2683];
var marseille = [43.2965, 5.3698];

var map = L.map("map").setView(nice, 13);

var cle = "eed6a6b4-d171-43e4-8215-e5f8490b4245";


var osm = L.tileLayer("https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png?api_key=" + cle, { attribution: "© Stadia Maps © OpenStreetMap" });
var stamen = L.tileLayer("https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png?api_key=" + cle, { attribution: "© Stadia Maps © Stamen © OpenStreetMap" });
osm.addTo(map);
L.control.layers({ "OpenStreetMap": osm, "Stamen": stamen }).addTo(map);

// Marqueur sur Nice
L.marker(nice).addTo(map).bindPopup("Nice");

// Triangle des Bermudes (Miami, Bermudes, Porto Rico)
L.polygon([[25.76, -80.19], [32.31, -64.75], [18.47, -66.11]], { color: "red" }).addTo(map);

// Segment Marseille - Nice
L.polyline([marseille, nice]).addTo(map);


fetch("https://geo.api.gouv.fr/communes/06088?format=geojson&geometry=contour")
    .then(r => r.json())
    .then(data => L.geoJSON(data).addTo(map));


function afficherPosition(pos) {
    var moi = [pos.coords.latitude, pos.coords.longitude];

    map.setView(moi, 13);
    L.marker(moi).addTo(map).bindPopup("Je suis ici").openPopup();

    L.circle(moi, { radius: pos.coords.accuracy }).addTo(map);

    var distance = map.distance(moi, marseille) / 1000;
    document.getElementById("distance").textContent = distance.toFixed(1) + " km";

    afficherTrajet(moi);
}

function afficherTrajet(moi) {
    var url = "https://router.project-osrm.org/route/v1/driving/"
        + moi[1] + "," + moi[0] + ";" + marseille[1] + "," + marseille[0]
        + "?overview=full&geometries=geojson";

    fetch(url)
        .then(r => r.json())
        .then(data => L.geoJSON(data.routes[0].geometry, { color: "purple" }).addTo(map));
}

navigator.geolocation.getCurrentPosition(afficherPosition);