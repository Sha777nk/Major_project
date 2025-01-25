# TO RUN THIS TYPE & C:/Python311/python.exe c:/Major_project/api/main.py IN TEMINAL
# PS C:\Major_project> cd frontend
# PS C:\Major_project\frontend> npm run dev


from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from pydantic import BaseModel
import numpy as np
import pandas as pd # type: ignore
from io import BytesIO
from PIL import Image
import tensorflow as tf
import joblib # type: ignore
import logging

# Initialize FastAPI app
app = FastAPI()

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load crop yield prediction model
CROP_YIELD_MODEL_PATH = "traning/crop_yield_model2.pkl"
try:
    crop_yield_model = joblib.load(CROP_YIELD_MODEL_PATH)
    print("Crop yield model loaded successfully.")
except Exception as e:
    logging.error(f"Error loading crop yield model: {e}")
    raise RuntimeError("Failed to load crop yield model.")

# Load disease classification model
DISEASE_MODEL_PATH = "C:/Major_project/saved_models/2.keras"
try:
    disease_model = tf.keras.models.load_model(DISEASE_MODEL_PATH)
    CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]
    print("Disease classification model loaded successfully.")
except Exception as e:
    logging.error(f"Error loading disease classification model: {e}")
    raise RuntimeError("Failed to load disease classification model.")

# Input schema for crop yield prediction
class CropYieldInput(BaseModel):
    state: str
    district: str
    crop: str
    area_acres: float
# Helper function for image processing
def read_file_as_image(data) -> np.ndarray:
    try:
        image = np.array(Image.open(BytesIO(data)))
        return image
    except Exception as e:
        logging.error(f"Error processing image: {e}")
        raise HTTPException(status_code=400, detail="Invalid image file.")

# Health check endpoint
@app.get("/ping")
async def ping():
    return {"message": "Hello, I am alive!"}

# Crop yield prediction endpoint
@app.post("/predict_yield")
async def predict_yield(input_data: CropYieldInput):
    try:
        # Convert input data to DataFrame
        input_df = pd.DataFrame([{
            "state": input_data.state,
            "District": input_data.district,
            "Crop": input_data.crop,
            "area_acres": input_data.area_acres
        }])

        # Predict yield
        predicted_yield = crop_yield_model.predict(input_df)[0]
        
        # Convert predicted_yield to a regular Python float
        predicted_yield = float(predicted_yield)

        return {
            "state": input_data.state,
            "district": input_data.district,
            "crop": input_data.crop,
            "area_acres": input_data.area_acres,
            "predicted_yield": predicted_yield
        }
    except Exception as e:
        logging.error(f"Error in /predict_yield: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


# Disease prediction endpoint
@app.post("/predict_disease")
async def predict_disease(file: UploadFile = File(...)):
    try:
        # Read and preprocess image
        image = read_file_as_image(await file.read())
        img_batch = np.expand_dims(image, 0)  # Add batch dimension

        # Predict disease
        predictions = disease_model.predict(img_batch)
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])

        return {
            "class": predicted_class,
            "confidence": float(confidence)
        }
    except Exception as e:
        logging.error(f"Error in /predict_disease: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)




