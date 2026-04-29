# Stage 1: Build frontend (Create React App -> build/)
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Build backend
FROM python:3.11-slim AS backend-builder
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .

# Stage 3: Production image with nginx reverse proxy
FROM python:3.11-slim
WORKDIR /app

# Install nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy backend code + dependencies
COPY --from=backend-builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=backend-builder /app /app

# Copy frontend build (CRA outputs to build/)
COPY --from=frontend-builder /app/frontend/build /var/www/html

# Copy nginx config template (LISTEN_PORT replaced at runtime from $PORT)
COPY nginx.conf.tpl /etc/nginx/nginx.conf.tpl

EXPOSE 8080

# On start: copy template -> replace LISTEN_PORT with $PORT -> start nginx + uvicorn
CMD cp /etc/nginx/nginx.conf.tpl /etc/nginx/nginx.conf && \
    sed -i "s/LISTEN_PORT/${PORT:-8080}/g" /etc/nginx/nginx.conf && \
    nginx -g 'daemon off;' & \
    python -m uvicorn app.main:app --host 127.0.0.1 --port 8080
