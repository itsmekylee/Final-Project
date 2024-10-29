function getWeather() {
    const apiKey = 'be15882d26ed7e8724c6641b2263ecf1';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be15882d26ed7e8724c6641b2263ecf1`;
    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=be15882d26ed7e8724c6641b2263ecf1`;
 
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast weather data:', error);
            alert('Error fetching forecast weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    const tempDivInfo = document.getElementById('temp-info');
    const weatherIcon = document.getElementById('weather-icon');

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        tempDivInfo.innerHTML = temperatureHTML;

        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;
        weatherInfoDiv.innerHTML = weatherHTML;

        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        weatherIcon.style.display = 'block';
    }
}

function displayHourlyForecast(data) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = data.list.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const hourlyTimeHtml = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather icon">
            <span>${temperature}°C</span>
        </div>
      `;
      hourlyForecastDiv.innerHTML += hourlyTimeHtml;
    });
}

function showImage() {

    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
    
}