import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [unit, setUnit] = useState('metric');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        setHistory(savedHistory);
    }, []);

    const fetchWeather = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:5000/api/weather/${city}?units=${unit}`);
            setWeather(response.data);
            if (city && !history.includes(city)) {
                const newHistory = [...history, city];
                setHistory(newHistory);
                localStorage.setItem('searchHistory', JSON.stringify(newHistory));
            }
        } catch (error) {
            setError('Error fetching weather data');
        } finally {
            setLoading(false);
        }
    };

    const toggleUnit = () => {
        setUnit(unit === 'metric' ? 'imperial' : 'metric');
    };

    const getLocationWeather = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:5000/api/weather?lat=${latitude}&lon=${longitude}&units=${unit}`);
                    setWeather(response.data);
                } catch (error) {
                    setError('Error fetching weather data');
                } finally {
                    setLoading(false);
                }
            });
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('searchHistory'); // Clear from localStorage
    };

    return (
        <div className="app">
            <h1 className="title"><span id="logo"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-thermometer-snow" viewBox="0 0 16 16">
  <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585A1.5 1.5 0 0 1 5 12.5"/>
  <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963.495-1.85a.5.5 0 1 1 .966.26l-.237.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963 1.849-.495a.5.5 0 1 1 .258.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.237.883a.5.5 0 1 1-.966.258L10.67 9.83 9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5"/>
</svg>SKYCAST</span>  - Weather App</h1>
            <input 
                type="text" 
                placeholder="Enter city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                className="input"
            />
        
            <div className="buttons">
            <button onClick={toggleUnit} className="unit-toggle-button">
                Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
            </button>
            <button onClick={fetchWeather} className="fetch-button">Get Weather</button>
            <button onClick={getLocationWeather} className="location-button">Get My Location Weather</button>
             </div>
            <button onClick={clearHistory} className="clear-history-button">Clear Search History</button>

            {loading && <div className="loader">Loading...</div>}
            {error && <div className="error">{error}</div>}

            {weather && <Weather weather={weather} unit={unit} />}

            <h3>Search History</h3>
            <ul type="none">
                {history.map((item, index) => (
                    <li key={index} onClick={() => setCity(item)}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
