const apiKey = "SUA_API_KEY_AQUI";

async function buscarClima() {
  const city = document.getElementById("cityInput").value;

  if (!city) return;
  const apiKey = "6c77dbad592cbe84a94491860fd3b689"; // chaveAPI
  // https://home.openweathermap.org/api_keys  ->site aonde peguei
  const url = `https://api.openweathermap.org/data/2.5/weather?q=caico&appid=6c77dbad592cbe84a94491860fd3b689&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temperature").innerText =
      `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").innerText =
      data.weather[0].description;
    document.getElementById("humidity").innerText = `${data.main.humidity}%`;
    document.getElementById("wind").innerText = `${data.wind.speed} km/h`;

    document.getElementById("weatherContainer").classList.remove("hidden");
  } catch (error) {
    alert("Erro ao buscar clima");
  }
}
