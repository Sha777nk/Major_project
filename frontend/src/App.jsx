// import { ImageUpload } from "./home.jsx";

// function App() {
//     return <ImageUpload />;
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import ImageUpload from "./home"; // Replace with your actual component
import CropYieldPrediction from "./CropYieldPrediction"; // Replace with your actual component
import WeatherForecast from "./WeatherForecast"; // Replace with your actual component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/image-upload" element={<ImageUpload />} />
                <Route path="/crop-yield-prediction" element={<CropYieldPrediction />} />
                <Route path="/weather-forecast" element={<WeatherForecast />} />
            </Routes>
        </Router>
    );
}

export default App;
