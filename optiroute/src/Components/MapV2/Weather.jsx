import React, { useState, useEffect } from 'react';

const Weather = ({ latitude, longitude }) => {
    const [weatherData, setWeatherData] = useState(null);

    function capitalizeFirstWord(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    useEffect(() => {
        if (latitude && longitude) {
            const fetchWeather = async () => {
                try {
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d7921e982601cc3dc903100205c91854&units=imperial`);
                    const data = await response.json();
                    setWeatherData(data);
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                }
            };

            fetchWeather();
        }
    }, [latitude, longitude]);

    if (!weatherData) return <div className="weather-info-container">Loading weather...</div>;

    const formatDate = () => {
        const date = new Date();
        return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    }

    return (
        <div className="weather-info-container">
            {weatherData ? (
                <>
                    <div className="weather-header">
                        <span className="weather-date">{formatDate()}</span>
                        <span className="weather-location">{weatherData.name}, {weatherData.sys.country}</span>
                    </div>
                    <div className="weather-details">
                        <img 
                            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
                            alt={`${weatherData.weather[0].main} icon`} 
                            className="weather-icon"
                        />
                        <span className="weather-temp">{weatherData.main.temp.toFixed(0)}°F</span>
                    </div>
                    <div className="weather-subtext">
                        <p>Feels like {weatherData.main.feels_like.toFixed(0)}°F, {capitalizeFirstWord(weatherData.weather[0].description)}</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Pressure: {weatherData.main.pressure} hPa</p>
                    </div>
                </>
            ) : (
                <p>Weather information not available.</p>
            )}
        </div>
    );
}

export default Weather;