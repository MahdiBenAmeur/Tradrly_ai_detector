# backend.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import uvicorn
import torch.nn.functional as F
from deep_translator import GoogleTranslator

# Path where you saved the model
MODEL_PATH = "my_ai_detection_model"

# Load model and tokenizer
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

# Create FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your Next.js frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request body
class PredictionRequest(BaseModel):
    text: str

# Prediction endpoint
@app.post("/predict")
def predict(request: PredictionRequest):
    # Translate input to English first
    translated_text = GoogleTranslator(source='auto', target='en').translate(request.text)

    inputs = tokenizer(translated_text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        print(logits)
        # Apply softmax to get probabilities
        probs = F.softmax(logits, dim=1).squeeze().tolist()
    print(probs)
    return {
        "original_text": request.text,
        "translated_text": translated_text,
        "probabilities": probs
    }

# Main launcher
if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)