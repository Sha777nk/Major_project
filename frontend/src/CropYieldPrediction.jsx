import React, { useState } from "react";
import axios from "axios";
import image from "./Bg.png"; // Replace with a relevant background image

const CropYieldPrediction = () => {
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [crop, setCrop] = useState("");
    const [area, setArea] = useState("");
    const [yieldPrediction, setYieldPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleYieldSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setYieldPrediction(null);
    
        // Validate area
        if (isNaN(parseFloat(area))) {
            setError("Please enter a valid number for area.");
            return;
        }
    
        const inputData = {
            state: state,
            district: district,
            crop: crop,
            area_acres: parseFloat(area), // Ensure area is sent as a float
        };
    
        console.log("Input Data:", inputData); // Debugging log
    
        try {
            const response = await axios.post("http://localhost:8000/predict_yield", inputData);
    
            console.log("Response Data:", response.data);
    
            // Update prediction state
            setYieldPrediction(response.data);
        } catch (error) {
            if (error.response) {
                console.error("API Response Error:", error.response.data);
                setError(error.response?.data?.detail || "Something went wrong. Please try again.");
            } else {
                console.error("Network or Server Error:", error.message);
                setError("Network or server error. Please try again.");
            }
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
        <div id="google_translate_element" style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        borderRadius: "15px",
        color: "#000000a6",
        fontSize: "20px",
        fontWeight: 900,
        zIndex: 1000,
    }}></div>
            <h1 style={{ textAlign: "center", paddingTop: "50px", color: "white" }}>Crop Yield Prediction</h1>

            <form 
                onSubmit={handleYieldSubmit} 
                style={{ 
                    maxWidth: "500px", 
                    margin: "0 auto", 
                    backgroundColor: "#ffffffcc", 
                    padding: "40px", 
                    borderRadius: "8px", 
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" 
                }}
            >
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        margin: "10px 0",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                    }}
                />
                <input
                    type="text"
                    placeholder="District"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        margin: "10px 0",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                    }}
                />
                <input
                    type="text"
                    placeholder="Crop"
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        margin: "10px 0",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                    }}
                />
                <input
                    type="number"
                    placeholder="Area (acres)"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        margin: "10px 0",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px 20px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "16px",
                        cursor: "pointer",
                        marginTop: "10px",
                    }}
                >
                    Predict Yield
                </button>
            </form>

            {yieldPrediction && (
                <div
                    style={{
                        maxWidth: "500px",
                        margin: "20px auto",
                        backgroundColor: "#ffffffcc",
                        padding: "40px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        textAlign: "center",
                    }}
                >
                    <h3 style={{ fontSize: "24px" }}>Predicted Yield</h3>
                    <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                        {yieldPrediction.predicted_yield} Tonne
                    </p> 
                    <p style={{ fontSize: "18px" }}>
                        The yield of <strong>{crop}</strong> in <strong>{district}</strong> for a land area of <strong>{area} acres</strong> is approximately <strong>{yieldPrediction.predicted_yield} Tonne</strong>.
                    </p>
                </div>
            )}

            {error && (
                <div
                    style={{
                        maxWidth: "500px",
                        margin: "20px auto",
                        backgroundColor: "#ffcccc",
                        padding: "10px",
                        borderRadius: "5px",
                        textAlign: "center",
                        color: "#a94442",
                        border: "1px solid #ebccd1",
                    }}
                >
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default CropYieldPrediction;
