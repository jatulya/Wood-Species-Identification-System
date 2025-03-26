import os
from fastapi import FastAPI, UploadFile
import tensorflow as tf
import numpy as np
from PIL import Image
import io

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow the frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Load your trained DenseNet model
model = tf.keras.models.load_model("wood_species_model.h5")

# Dynamically get class names from the dataset folder
DATASET_PATH = "./imgs"
species_names = sorted([d for d in os.listdir(DATASET_PATH) if os.path.isdir(os.path.join(DATASET_PATH, d))])
print(species_names)


@app.post("/predict/")
async def predict(file: UploadFile):
    image = Image.open(io.BytesIO(await file.read())).resize((224, 224))
    img_array = np.expand_dims(np.array(image) / 255.0, axis=0)
    
    prediction = model.predict(img_array)
    predicted_class = species_names[np.argmax(prediction)]
    confidence = float(np.max(prediction))

    return {"species": predicted_class, "confidence": confidence}
