import React, { useState } from "react";
import axios from "axios";
import image from "./Bg.png";

const WeatherForecast = () => {
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [weather, setWeather] = useState(null);

    const WEATHER_API_KEY = "204644ad1675467521f361a488e691db"; // Replace with your OpenWeatherMap API Key
    const GEO_API_KEY = "204644ad1675467521f361a488e691db"; // Replace with your OpenWeatherMap Geo API Key

    // Fetch city suggestions using OpenWeatherMap Geo API
    const fetchCitySuggestions = async (query) => {
        if (!query) return setSuggestions([]);

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/geo/1.0/direct?q=${query},IN&limit=10&appid=${GEO_API_KEY}`
            );

            // Filter or process the suggestions as needed
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching city suggestions:", error);
        }
    };

    // Fetch weather details using OpenWeatherMap API
    const fetchWeather = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
            );
            setWeather(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const handleCitySelect = (city) => {
        setCity(city.name); // Store selected city
        setSuggestions([]); // Clear suggestions after selection
        fetchWeather(city.lat, city.lon); // Fetch weather for the selected city
    };

    const handleSearch = () => {
        const selectedCity = suggestions.find((s) => s.name === city);
        if (selectedCity) {
            fetchWeather(selectedCity.lat, selectedCity.lon); // Fetch weather for selected city
        }
    };

    return (
        <div
        style={{
            fontFamily: "Arial, sans-serif",
            backgroundImage: `url(${image})`, // Replace with your image URL
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: "100vh",
            marginTop: "-25px",
        }}
    >
            <div id="google_translate_element"  style={{
            
                position: 'absolute',
                top: '10px',
                right: '10px',
                borderRadius: "15px",
                color: "#000000a6",
                fontSize: "20px",
                fontWeight: 900,
                zIndex: 1000,
            
        }}></div>
            <h1 style={{paddingTop: "50px", textAlign: "center", color: "#00022B" }}>Weather Prediction </h1>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                        fetchCitySuggestions(e.target.value); // Get city suggestions as user types
                    }}
                    style={{
                        width: "300px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        marginRight: "10px",
                        fontSize: "16px",
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Search
                </button>
            </div>

            {suggestions.length > 0 && (
                <ul style={{ listStyleType: "none", padding: 0, marginTop: "10px", maxHeight: "200px", overflowY: "auto", border: "1px solid #ccc", borderRadius: "5px" }}>
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            onClick={() => handleCitySelect(suggestion)}
                            style={{
                                cursor: "pointer",
                                padding: "10px",
                                borderBottom: "1px solid #eee",
                                backgroundColor: "#feofe",
                            }}
                        >
                            {suggestion.name}, {suggestion.state} - {suggestion.country}
                        </li>
                    ))}
                </ul>
            )}

            {weather && (
                <div style={{
                    maxWidth: "500px",
                    margin: "20px auto",
                    backgroundColor: "#ffffffcc",
                    padding: "40px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                }}>
                    <h2 style={{ textAlign: "center", color: "#00022B" }}>Weather in {weather.name}</h2>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                            style={{ width: "100px", height: "100px" }}
                        />
                        <p style={{ fontSize: "25px", color: "#00022B" }}>
                            Temperature: <strong>{weather.main.temp}°C</strong>
                        </p>
                        <p style={{ fontSize: "25px", color: "#00022B" }}>
                            Condition: <strong>{weather.weather[0].description}</strong>
                        </p>
                        <p style={{ fontSize: "25px", color: "#00022B" }}>
                            Humidity: <strong>{weather.main.humidity}%</strong>
                        </p>
                        <p style={{ fontSize: "25px", color: "#00022B" }}>
                            Wind Speed: <strong>{weather.wind.speed} m/s</strong>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherForecast;






// import React, { useState } from "react";
// import axios from "axios";

// const WeatherForecast = () => {
//     const [city, setCity] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [weather, setWeather] = useState(null);

//     const GEO_DB_API_KEY = "4b7d738a06msha1295b65ec93d50p14f1dfjsn08d5e2bd604"; // Replace with your GeoDB API Key
//     const WEATHER_API_KEY = "a271bf0f0b41d9a76747d329c597ae28"; // Replace with your OpenWeatherMap API Key

//     // Fetch city suggestions
//     const fetchCitySuggestions = async (query) => {
//         if (!query) return setSuggestions([]);

//         try {
//             const response = await axios.get("https://wft-geo-db.p.rapidapi.com/v1/geo/cities", {
//                 params: { namePrefix: query },
//                 headers: {
//                     "X-RapidAPI-Key": GEO_DB_API_KEY,
//                     "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
//                 },
//             });
//             setSuggestions(response.data.data);
//         } catch (error) {
//             console.error("Error fetching city suggestions:", error);
//         }
//     };

//     // Fetch weather details
//     const fetchWeather = async (latitude, longitude) => {
//         try {
//             const response = await axios.get(
//                 `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
//             );
//             setWeather(response.data);
//         } catch (error) {
//             console.error("Error fetching weather data:", error);
//         }
//     };

//     const handleCitySelect = (city) => {
//         setCity(city.city);
//         setSuggestions([]);
//         fetchWeather(city.latitude, city.longitude);
//     };

//     return (
//         <div>
//             <h1>Weather Prediction</h1>
//             <input
//                 type="text"
//                 placeholder="Enter city name..."
//                 value={city}
//                 onChange={(e) => {
//                     setCity(e.target.value);
//                     fetchCitySuggestions(e.target.value);
//                 }}
//                 style={{ width: "300px", padding: "10px", margin: "10px 0" }}
//             />
//             {suggestions.length > 0 && (
//                 <ul>
//                     {suggestions.map((suggestion) => (
//                         <li
//                             key={suggestion.id}
//                             onClick={() => handleCitySelect(suggestion)}
//                             style={{ cursor: "pointer", margin: "5px 0" }}
//                         >
//                             {suggestion.city}, {suggestion.country}
//                         </li>
//                     ))}
//                 </ul>
//             )}

//             {weather && (
//                 <div>
//                     <h2>Weather in {weather.name}</h2>
//                     <p>Temperature: {weather.main.temp}°C</p>
//                     <p>Condition: {weather.weather[0].description}</p>
//                     <p>Humidity: {weather.main.humidity}%</p>
//                     <p>Wind Speed: {weather.wind.speed} m/s</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default WeatherForecast;

