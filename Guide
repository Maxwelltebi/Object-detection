 Project Title: African Product Recognition Model (Open Source)
Project name: GUAVA
A community-driven AI model that recognizes African retail products (food items, snacks, drinks, packaging, etc.) using photos uploaded by users.

This project collects images through a simple website, labels them, builds a dataset, and trains a machine learning model that can identify African products. The model will later be published on Hugging Face and served through a FastAPI API.

Goal of the Project

To create the first open-source computer vision model trained on African retail products—useful for small shops, e-commerce platforms, farmers, vendors, and developers.

Why This Project Matters

Most vision models don’t recognize local brands (e.g., Alomo Bitters, FanYogo, Kalyppo, Gari brands, Onga, Indomie variants).

Many African businesses want automation tools but lack specialized models.

This fills a unique gap and builds African AI infrastructure.

It is safe, legal, and easy enough for you to learn every step.

What You Will Learn

Web development (HTML/JS or React)

Backend APIs with FastAPI

Storage & databases

ML model training and dataset curation

Serving ML models in production

Open-source project management

Deployment basics

Perfect for beginners who want to grow into full AI developers.

High-Level System Overview

The system has 3 main parts:

1. Data Contribution Website

Users upload product images and label them.
Provides:

Upload form

Label dropdown

View dataset samples

Simple account system (optional)

2. FastAPI Backend

Handles:

Image uploads

Label submissions

Dataset storage

Model inference API

Admin validation endpoints

3. Model Training Pipeline

Scrape the dataset from storage

Clean and preprocess

Fine-tune a small vision model (EfficientNet / MobileNet / ViT)

Save and publish model on Hugging Face

Data You Will Collect

Categories (start small):

Phase 1 Categories (MVP)

Plantain chips

Gari (white/yellow)

FanYogo drink variants

Malta Guinness / Fanta / Sprite

Indomie (Regular & Chicken flavors)

Milo / Peak milk

Local water brands (Bel-Aqua, Verna, etc.)

10 categories is enough for v1.

Dataset Structure

Your dataset folder will look like:

dataset/
   ├── plantain_chips/
   ├── gari_white/
   ├── gari_yellow/
   ├── fan_yogo/
   ├── malta_guinness/
   ├── verna/
   └── indomie_chicken/


Each folder contains user-uploaded images.

Detailed Beginner-Friendly Project Plan
PHASE 1 — Project Setup (Week 1)
Create GitHub repository

Structure:

/backend
/frontend
/ml
/docs
/dataset

Write README.md

Explain the vision and how others can contribute.

Decide initial categories (10 items)
PHASE 2 — Build the FastAPI Backend (Week 1–2)
Endpoints to build:
POST /upload-image

Accepts an image

Accepts a label string

Saves to dataset folder

Returns success message

GET /dataset

Returns list of items and sample images

POST /predict

Accepts image

Returns model prediction (optional until model is trained)

Admin endpoints (optional for later)

Approve or reject images

Delete bad samples

What you’ll learn:

FastAPI basics

File uploads

Handling static files

Simple authentication (if needed)

PHASE 3 — Build the Data Contribution Website (Week 2–3)
Pages to include:
1. Home Page

Intro to the project

"Contribute Data" button

Stats (# images, categories)

2. Upload Page

File upload box

Dropdown to choose category

Submit button

3. Dataset Preview

Grid of uploaded images

Category filter

4. About / Documentation

Explain the mission

How the community helps

How to use the dataset

Tools:

HTML/CSS/JS (simplest)

or React (if you prefer)

PHASE 4 — Model Training (Week 3–4)
Steps:

Load images

Clean images (resize, normalization)

Train a small vision model:

EfficientNet-B0

MobileNetV3

ViT-small

Evaluate accuracy

Save model (model.pt or model.onnx)

Upload to Hugging Face

Beginner-friendly tools:

PyTorch

TensorFlow/Keras

Hugging Face Transformers

FastAI (very beginner-friendly)

PHASE 5 — Inference API (Week 4)

Integrate the trained model into FastAPI:

Load model at startup

Accept image → preprocess → predict

Return JSON response:

{
  "prediction": "Plantain Chips",
  "confidence": 0.93
}


Apps or websites can now use your API!

PHASE 6 — Launch as Open Source (Week 5)
You will:

Push dataset to Hugging Face Datasets

Push model to Hugging Face Models

Publish documentation on GitHub

Share with developer communities

Invite contributors

Add "Issues" and "Good First Issue" tags

📅 30-Day Timeline Summary
Week 1

Create repo

Set up FastAPI backend

Start simple frontend

Week 2

Finish upload + dataset preview

Store images properly

Prepare categories

Week 3

Build ML pipeline

Train basic model

Evaluate it

Week 4

Integrate model into FastAPI

Publish on Hugging Face

Invite community contributions

🚀 Final Output After 1 Month

You will have:

✔ A working website

Anyone can upload African product images.

✔ A growing dataset

Organized and updated through your platform.

✔ A trained product recognition model

Beginner-friendly and open source.

✔ A FastAPI inference server

Developers can send images and get predictions.

✔ An open-source GitHub project

Other African developers can contribute.