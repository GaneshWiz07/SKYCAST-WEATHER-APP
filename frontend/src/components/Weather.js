import React from 'react';

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
            <p>{getTemperature()}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p>Wind Speed: {getWindSpeed()} {unit === 'metric' ? 'm/s' : 'mph'}</p>
            <i className={iconClass()} style={{ color: iconColor() }} />
            <p>{weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
        </div>
    );
};

export default Weather;
