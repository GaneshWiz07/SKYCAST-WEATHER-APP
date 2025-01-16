// Weather.js
import React from 'react';
import './Weather.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Weather = ({ weather, unit }) => {
    const iconClass = () => {
        switch (weather.weather[0].main) {
            case 'Clear':
                return 'fas fa-sun';
            case 'Rain':
                return 'fas fa-cloud-showers-heavy';
            case 'Clouds':
                return 'fas fa-cloud';
            case 'Snow':
                return 'fas fa-snowflake';
            case 'Thunderstorm':
                return 'fas fa-bolt';
            default:
                return 'fas fa-smog';
        }
    };

    const getTemperature = () => {
        return unit === 'metric' ? Math.round(weather.main.temp) : Math.round(weather.main.temp * 9 / 5 + 32);
    };

    const getWindSpeed = () => {
        return unit === 'metric' ? Math.round(weather.wind.speed) : Math.round(weather.wind.speed * 2.237); // Convert m/s to mph
    };

    const iconColor = () => {
        switch (weather.weather[0].main) {
            case 'Clear':
                return '#FFD700'; 
            case 'Rain':
                return '#1E90FF'; 
            case 'Clouds':
                return '#B0C4DE'; 
            case 'Snow':
                return '#FFFFFF';
            case 'Thunderstorm':
                return '#FF4500'; 
            default:
                return '#808080'; 
        }
    };

    return (
        <div className="weather-info">
            <h2>{weather.name}</h2>
            <div className="temperature-container">
                <p className="temperature">{getTemperature()}°{unit === 'metric' ? 'C' : 'F'}</p>
            </div>
            <div className="weather-details">
                <div className="weather-detail">
                    <i className="fas fa-wind" style={{ marginRight: '10px', color: '#4CAF50' }} />
                    <span>Wind Speed: {getWindSpeed()} {unit === 'metric' ? 'm/s' : 'mph'}</span>
                </div>
                <div className="weather-detail">
                    <i className="fas fa-tint" style={{ marginRight: '10px', color: '#2196F3' }} />
                    <span>Humidity: {weather.main.humidity}%</span>
                </div>
            </div>
            <i className={iconClass()} style={{ fontSize: '2em', color: iconColor(), marginTop: '20px' }} />
            <p>{weather.weather[0].description}</p>
        </div>
    );
};

export default Weather;