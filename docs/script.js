const button = document.getElementById("get-weather-btn");
const select = document.getElementById("city-select");

// 1️⃣ getWeather function
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`
    );

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// 2️⃣ showWeather function
async function showWeather(city) {
  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later.");
    return;
  }

  document.getElementById("location").textContent =
    data.name || "N/A";

  document.getElementById("weather-main").textContent =
    data.weather?.[0]?.main || "N/A";

  document.getElementById("weather-icon").src =
    data.weather?.[0]?.icon || "";

  document.getElementById("main-temperature").textContent =
    data.main?.temp !== undefined
      ? `Temperature: ${data.main.temp} °C`
      : "N/A";

  document.getElementById("feels-like").textContent =
    data.main?.feels_like !== undefined
      ? `Feels like: ${data.main.feels_like} °C`
      : "N/A";

  document.getElementById("humidity").textContent =
    data.main?.humidity !== undefined
      ? `Humidity: ${data.main.humidity}%`
      : "N/A";

  document.getElementById("wind").textContent =
    data.wind?.speed !== undefined
      ? `Wind speed: ${data.wind.speed} m/s`
      : "N/A";

  document.getElementById("wind-gust").textContent =
    data.wind?.gust !== undefined
      ? `Wind gust: ${data.wind.gust} m/s`
      : "N/A";
}

// 3️⃣ Button click handler
button.addEventListener("click", () => {
  const city = select.value;

  if (!city) return;

  showWeather(city);
});
