"use strict";
const btnUbicarme = document.getElementById("ubicarme");
const section = document.getElementById("section");
section.style = "display:none;";
btnUbicarme.addEventListener("click", () => {
  const disponible = "geolocation" in navigator;
  if (disponible) {
    consultarClima();
  } else {
    const fuera = document.getElementById("fuera");
    fuera.innerHTML = "<strong>No es posible ver el clima</strong>";
  }
});

const consultarClima = () => {
  //Acceso a API de Geolocalización
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitud = position.coords.latitude;
      const longitud = position.coords.longitude;

      const tempCard = document.getElementById("temperatura");
      const climaCard = document.getElementById("clima");
      const humedadCard = document.getElementById("humedad");

      section.style = "display: grid;";

      //Llamada de API
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid={API_KEY}&lang=es&units=metric`
        )
        .then((response) => {
          const clima = response.data.weather[0].description;
          const temperatura = response.data.main.temp;
          const humedad = response.data.main.humidity;
          console.log(
            "El clima es: " +
              clima +
              " con una temperatura de: " +
              temperatura +
              " °C. Se presenta una humedad de: " +
              humedad
          );

          tempCard.innerHTML = `La temperatura es: ${temperatura} °C`;
          climaCard.innerHTML = `Clima: ${clima}`;
          humedadCard.innerHTML = `Humedad: ${humedad} %`;
        })

        .catch((error) => {
          console.error(error);
        });
    },
    (error) => {
      alert("Error: " + error);
    }
  );
};
