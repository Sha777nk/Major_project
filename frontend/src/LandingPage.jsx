import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import P_btn from "./potato_btn.png";
import Y_btn from "./Yield_btn.png";
import W_btn from "./Weather_btn.png";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f5f5f5",
                padding: 2,
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
            <Typography variant="h3" gutterBottom>
                Farmer's Delight
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Empowering farmers with technology
            </Typography>

            <Box
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "row", // Buttons in a single row
                    gap: 3, // Space between buttons
                }}
            >
                {/* Image Upload Button */}
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => navigate("/image-upload")}
                    sx={{
                        width: 300, // Larger width
                        height: 150, // Larger height
                        display: "flex",
                        flexDirection: "column",
                        borderRadius:5,
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1, // Space between image and label
                    }}
                >
                    <Box
                        component="img"
                        src={P_btn} // Replace with the actual path to your image
                        alt="Image Upload Icon"
                        sx={{
                            width: 100, // Image size
                            height: 100,
                        }}
                    />
                    Potato Disease Identification
                </Button>

                {/* Crop Yield Prediction Button */}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/crop-yield-prediction")}
                    sx={{
                        width: 300,
                        height: 150,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius:5,
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                    }}
                >
                    <Box
                        component="img"
                        src={Y_btn} // Replace with the actual path to your image
                        alt="Crop Yield Icon"
                        sx={{
                            width: 100,
                            height: 100,
                        }}
                    />
                    Crop Yield Prediction
                </Button>

                {/* Weather Forecast Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/weather-forecast")}
                    sx={{
                        width: 300,
                        height: 150,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius:5,
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                    }}
                >
                    <Box
                        component="img"
                        src={W_btn} 
                        alt="Weather Forecast Icon"
                        sx={{
                            width: 100,
                            height: 100,
                        }}
                    />
                    Weather Forecast
                </Button>
            </Box>
        </Box>
    );
};

export default LandingPage;
