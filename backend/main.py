'''import os
from fastapi import FastAPI, UploadFile
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from species import get_species_details 

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Allow the frontend origins

    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Load your trained DenseNet model
model = tf.keras.models.load_model("wood_species_model.h5")

# Dynamically get class names from the dataset folder
species_names = ['albizia', 'australian-blackwood', 'australian-buloke', 'balsam-fir', 'birch', 'black-wattle', 'box-elder', 'bubinga', 'cedar', 'cs_sycamore', 'mahogany', 'padauk', 'pine', 'pine_douglas_fir', 'poplar', 'red_oak', 'rosewood', 'walnut']

@app.post("/predict/")
async def predict(file: UploadFile):
    image = Image.open(io.BytesIO(await file.read())).resize((224, 224))
    img_array = np.expand_dims(np.array(image) / 255.0, axis=0)
    
    prediction = model.predict(img_array)
    predicted_class = species_names[np.argmax(prediction)]
    confidence = float(np.max(prediction))

    species_details = get_species_details(predicted_class)
    return species_details
'''
import torch
import torchvision.transforms as transforms
import torch.nn as nn
import torch.nn.functional as F
import torchvision.models as models
from fastapi import FastAPI, UploadFile, File
from PIL import Image
import io
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from species import get_species_details 

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Allow the frontend origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)
# Define device (CPU/GPU)
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Define class labels (Ensure they match your dataset)
CLASS_NAMES = [
    "Ailanthus altissima", "Alnus glutinosa", "Castanea sativa", 
    "Cupressus sempervirens", "Fagus sylvatica", "Fraxinus ornus",
    "Juglans regia", "Picea abies", "Pinus sylvestris", 
    "Platanus orientalis", "Quercus cerris", "Robinia pseudoacacia"
]

# Load the trained model directly
def load_model():
    
    model = torch.load('best_finetuned_model.pth', map_location=DEVICE, weights_only=False)
    model.to(DEVICE)
    model.eval()
    return model

# Load model once
model = load_model()

# Image preprocessing function
def transform_image(image_bytes):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return transform(image).unsqueeze(0)  # Add batch dimension

# Prediction route
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image_tensor = transform_image(image_bytes).to(DEVICE)

    with torch.no_grad():
        outputs = model(image_tensor)
        probabilities = F.softmax(outputs, dim=1)
        _, predicted = torch.max(outputs, 1)

    predicted_class = CLASS_NAMES[predicted.item()]
    confidence = probabilities[0][predicted.item()].item()

    species_details = get_species_details(predicted_class)
    species_details['predicted_class'] = predicted_class
    species_details['confidence'] = f"{confidence:.4f}"

    return species_details
    
