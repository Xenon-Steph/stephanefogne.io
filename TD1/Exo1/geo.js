var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
};


function afficher(pos, section) {
    var crd = pos.coords;

    document.getElementById(section + "-lon").textContent = crd.longitude + " °";
    document.getElementById(section + "-lat").textContent = crd.latitude + " °";

    if (crd.altitude !== null) {
        document.getElementById(section + "-alt").textContent = crd.altitude + " m";
    } else {
        document.getElementById(section + "-alt").textContent = "Non disponible";
    }

    document.getElementById(section + "-precision").textContent = crd.accuracy + " m";

    if (crd.speed !== null) {
        document.getElementById(section + "-vitesse").textContent = crd.speed + " m/s";
    } else {
        document.getElementById(section + "-vitesse").textContent = "Non disponible";
    }

    var date = new Date(pos.timestamp);
    document.getElementById(section + "-date").textContent = date.toLocaleString("fr-FR");

    document.getElementById("statut").textContent = "Position trouvée";
}

function success(pos) {
    afficher(pos, "current");
}

function watchSuccess(pos) {
    afficher(pos, "watch");
}

function error(err) {
    document.getElementById("statut").textContent = "Erreur (" + err.code + ") : " + err.message;
}

navigator.geolocation.getCurrentPosition(success, error, options);
navigator.geolocation.watchPosition(watchSuccess, error, options);
