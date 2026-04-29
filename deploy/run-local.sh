#!/bin/bash

# Script to run the Psych Test App locally without Docker

echo "Starting Psych Test App..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install

# Build frontend
echo "Building frontend..."
npm run build

# Start backend in background
echo "Starting backend..."
cd ../backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &

# Serve frontend
echo "Serving frontend..."
cd ../frontend
npx serve -s build -l 3000 &

echo "App started!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop"

# Keep script running
wait