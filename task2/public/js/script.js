let form = document.getElementById("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  weatherFun();
  loadingIcon.style.display = "block";
});

let loadingIcon = document.getElementById("loading");
let country = document.getElementById("country");
let latitude = document.getElementById("latitude");
let longtitude = document.getElementById("longtitude");
let temperature = document.getElementById("temp");

let errorForm = document.getElementById("errorForm");
let errorText = document.getElementById("error");
let weatherData = document.getElementById("form-details");

let weatherFun = async () => {
  try {
    const countryInput = document.getElementById("country-in").value;
    const res = await fetch(
      "http://localhost:5000/weather?address=" + countryInput
    );
    const data = await res.json();
    loadingIcon.style.display = "none";

    if (data.error) {
      errorForm.style.display = "block";
      weatherData.style.display = "none";
      errorText.innerHTML = "Error : " + data.error;
      return;
    }
    weatherData.style.display = "block";
    errorForm.style.display = "none";
    country.innerHTML = "Country : " + countryInput;
    latitude.innerHTML = "Latitude : " + data.latitude;
    longtitude.innerHTML = "Longtitude : " + data.longtitude;
    temperature.innerHTML = "Temperature : " + data.temperature;
  } catch (e) {
    console.log(e);
  }
};
