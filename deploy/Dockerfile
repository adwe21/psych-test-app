# Dockerfile for Psych Test App

# Build frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ .
RUN npm run build

# Build backend
FROM python:3.11-slim as backend-builder
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .

# Production image
FROM python:3.11-slim
WORKDIR /app

# Install nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy frontend build
COPY --from=frontend-builder /app/build /var/www/html

# Copy backend
COPY --from=backend-builder /app /app

# Copy nginx config
COPY deploy/nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx and uvicorn
CMD service nginx start && uvicorn app.main:app --host 0.0.0.0 --port 8000