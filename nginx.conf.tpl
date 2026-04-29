# Nginx config template for Zeabur
# LISTEN_PORT will be replaced by sed at runtime with $PORT

events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    upstream backend {
        server 127.0.0.1:8080;
    }

    server {
        listen LISTEN_PORT;
        server_name localhost;

        # Serve static frontend files (CRA build/)
        location / {
            root /var/www/html;
            index index.html;
            try_files $uri $uri/ /index.html;
        }

        # Proxy API requests to FastAPI backend
        location /api {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # Health check endpoint
        location /health {
            proxy_pass http://backend;
        }
    }
}
