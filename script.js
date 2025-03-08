const apiKey = "c969186f2f987561c0b36e8a3b64ed7c"; // Replace with your OpenWeatherMap API Key

async function getWeather() {
    let city = document.getElementById("cityInput").value;
    
    if (city.trim() === "") {
        alert("Please enter a city name!");
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        let response = await fetch(url, { mode: "cors" });
        let data = await response.json();

        if (data.cod !== 200) {
            alert(`Error: ${data.message}`);
            return;
        }

        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temperature").innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById("windSpeed").innerText = `Wind Speed: ${data.wind.speed} km/h`;

        let iconCode = data.weather[0].icon;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Something went wrong. Please try again.");
    }
}