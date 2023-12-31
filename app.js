const BASE_URL = "https://clumsy-worm-leotard.cyclic.app"

async function fetchData(url) {
    try {
        const response = await fetch(`${BASE_URL}${url}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to create city cards
function createCityCards(citiesData) {
    const citiesContainer = document.getElementById('citiesContainer');
    citiesContainer.innerHTML = '';
    citiesData.forEach(cityData => {
        const { city, weather } = cityData;
        const cityCard = document.createElement('div');
        cityCard.className = 'city-card';
        cityCard.innerHTML = `
            <h3>${city.name}</h3>
            <p class="country-code">${city.country}</p>
            <p class="temperature">${weather.temperature}°C</p>
            <p class="weather-condition">${weather.condition}</p>
        `;
        cityCard.addEventListener('click', () => showForecast(city.id));
        citiesContainer.appendChild(cityCard);
    });
}

// Function to create forecast items
function createForecastItems(forecastData) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    forecastData.forEach(item => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <h3>${item.hour}:00 hrs</h3>
            <p class="temperature">${item.temperature}°C</p>
            <p class="weather-condition">Wind: ${item.windspeed} mps</p>
            <p class="weather-condition">${item.condition}</p>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

// Function to show forecast for a selected city
async function showForecast(cityId) {
    const forecastData = await fetchData(`/forecast/${cityId}`);
    createForecastItems(forecastData.forecast);
}

// Function to fetch and display current weather data
async function displayCurrentWeather() {
    const currentWeatherData = await fetchData(`/current-weather`);
    createCityCards(currentWeatherData);
    // Display forecast for the first city by default
    if (currentWeatherData.length > 0) {
        showForecast(currentWeatherData[0].city.id);
    }
}

displayCurrentWeather();