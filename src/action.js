function formateDate(timestamp) {
  let now = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#weather").innerHTML = Math.round(
    response.data.main.temp
  ); //current temperature
  document.querySelector("#current-city").innerHTML = response.data.name; //name of city

  let iconElement = document.querySelector("#icon");
  let skyDescriptionElement = document.querySelector("#sky-description");
  let skyDescriptionSpecialElement = document.querySelector(
    "#sky-description-special"
  );
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  let dateElement = document.querySelector("#current-date");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  skyDescriptionElement.innerHTML = response.data.weather[0].main;
  skyDescriptionSpecialElement.innerHTML = response.data.weather[0].description;

  dateElement.innerHTML = formateDate(response.data.dt * 1000);
}

function searchCity(city) {
  let key = "6fa0aa19737bc1b820cf0e5af8325e8f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "6fa0aa19737bc1b820cf0e5af8325e8f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#form-input").value;
  searchCity(city);
}

function showCurrentLocation(position) {
  position.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let formSearch = document.querySelector("#form-search");
formSearch.addEventListener("click", handleSubmit);

let btnCurrentLocation = document.querySelector("#button");
btnCurrentLocation.addEventListener("click", showCurrentLocation);

searchCity("Kiev");
