const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");

const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const weatherStatus = document.getElementById("weatherStatus");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

const forecastBox = document.getElementById("forecastBox");
const forecastList = document.getElementById("forecastList");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    showMessage("Please enter a city name.");
    return;
  }

  getWeatherByCity(city);
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

async function getWeatherByCity(city) {
  try {
    showMessage("Loading weather data...");
    weatherCard.classList.add("hidden");
    forecastBox.classList.add("hidden");

    const locationUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const locationResponse = await fetch(locationUrl);
    const locationData = await locationResponse.json();

    if (!locationData.results || locationData.results.length === 0) {
      showMessage("City not found. Please try another city.");
      return;
    }

    const location = locationData.results[0];
    const latitude = location.latitude;
    const longitude = location.longitude;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5&timezone=auto`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    displayCurrentWeather(location, weatherData);
    displayForecast(weatherData);

    showMessage("");
  } catch (error) {
    console.log(error);
    showMessage("Something went wrong. Please try again.");
  }
}

function displayCurrentWeather(location, weatherData) {
  const current = weatherData.current;

  cityName.textContent = `${location.name}, ${location.country}`;
  weatherStatus.textContent = getWeatherStatus(current.weather_code);
  temperature.textContent = `${current.temperature_2m}°C`;
  feelsLike.textContent = `${current.apparent_temperature}°C`;
  humidity.textContent = `${current.relative_humidity_2m}%`;
  windSpeed.textContent = `${current.wind_speed_10m} km/h`;

  weatherCard.classList.remove("hidden");
}

function displayForecast(weatherData) {
  forecastList.innerHTML = "";

  const daily = weatherData.daily;

  for (let i = 0; i < daily.time.length; i++) {
    const date = daily.time[i];
    const maxTemp = daily.temperature_2m_max[i];
    const minTemp = daily.temperature_2m_min[i];
    const code = daily.weather_code[i];

    const forecastItem = document.createElement("div");
    forecastItem.className = "forecast-item";

    forecastItem.innerHTML = `
      <span>${formatDate(date)}</span>
      <span>${getWeatherStatus(code)}</span>
      <span>${minTemp}°C / ${maxTemp}°C</span>
    `;

    forecastList.appendChild(forecastItem);
  }

  forecastBox.classList.remove("hidden");
}

function getWeatherStatus(code) {
  const weatherCodes = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Cloudy",
    45: "Fog",
    48: "Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Heavy Drizzle",
    61: "Light Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Light Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    80: "Rain Showers",
    81: "Heavy Showers",
    82: "Violent Showers",
    95: "Thunderstorm"
  };

  return weatherCodes[code] || "Unknown Weather";
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });
}

function showMessage(text) {
  message.textContent = text;
}