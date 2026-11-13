var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;

  console.log("Votre position actuelle est :");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude : ${crd.longitude}`);
  console.log(`La précision est de ${crd.accuracy} mètres.`);
  document.getElementById("lon").innerHTML = "lartitute = " + crd.latitude + "°";
  document.getElementById("lar").innerHTML = "longitude = " + crd.longitude + "°";
  document.getElementById("al").innerHTML = "altitude = " + crd.accuracy + "m";
}

function error(err) {
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);