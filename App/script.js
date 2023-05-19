"use strict";

// Selectors:
const container = document.querySelector(".container"), // Elements mother
  getLocationBtn = document.querySelector("#getLocation"), // Location btn
  textInput = document.querySelector("#inputText"); // Place to enter the city name


// HTML codes to append
const resultMenu = `<div class="result">
  <div class="result-header">
    <button onclick="goBack() id="backToMain">
      <span class="material-symbols-outlined"> arrow_back </span>
      <span>Weather App</span>
    </button>
  </div>
  <hr />
  <div class="status">
    <img id="img--status" src="Weather App/Assets/cloudy.png"/>
    <p id="temp"><span id="tempState">13</span> C</p>
    <p id="sky--status">Broken Clouds</p>
    <div id="region">
      <span class="material-symbols-outlined"> location_on </span>
      <span id="location">Deh Dasht, Iran</span>
    </div>
  </div>
  <div class="details">
    <button class="temperature">
      <span class="material-symbols-outlined icon-detail"> device_thermostat </span>
      <div>
        <p><span id="feelsLike">17</span> C</p>
        <p>Feels like</p>
      </div>
    </button>
    <button class="humidity">
      <span class="material-symbols-outlined icon-detail"> humidity_percentage </span>
      <div>
        <p id="humidity">84%</p>
        <p>Humidity</p>
      </div>
    </button>
  </div>
</div>`;

// functions to get data:
const getDataByName = async function (name) {
  const responseInName = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e00607edef068ecf074650739c8b816d&units=metric`
  );
  const DataInName = await responseInName.json();

  return DataInName;
};

const getDataByCoord = async function (latitude, longitude) {
  const responseInCoord = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e00607edef068ecf074650739c8b816d&units=metric`
  );
  const DataInCoord = await responseInCoord.json();

  return DataInCoord;
};

async function loadContent(func, arg1, arg2) {
  try {
    if (arg2) {
      var data = await func(arg1, arg2);
    } else {
      var data = await func(arg1);
    }

    console.log(data);
    const imageStatus = document.querySelector("#img--status"),
      mainTemp = document.querySelector("#tempState"),
      skyStatus = document.querySelector("#sky--status"),
      city = document.querySelector("#location"),
      feelsLike = document.querySelector("#feelsLike"),
      humidity = document.querySelector("#humidity");

    imageStatus.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    city.textContent = data.name;
    mainTemp.textContent = data.main.temp;
    skyStatus.textContent = data.weather[0].description;
    feelsLike.textContent = data.main.feels_like;
    humidity.textContent = data.main.humidity + "%";
  } catch (error) {
    console.log(error);
    // handle the error
  }
}

// Event listeners to append codes
textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const cityName = textInput.value;
    container.removeChild(container.firstChild);
    container.innerHTML = resultMenu;

    loadContent(getDataByName, cityName);
  }
});

getLocationBtn.addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        container.removeChild(container.firstChild);
        container.innerHTML = resultMenu;
        loadContent(getDataByCoord, latitude, longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
});

// git remote add origin https://github.com/RezaBakhshiNia/Weather-App.git
// git branch -M main
// git push -u origin main