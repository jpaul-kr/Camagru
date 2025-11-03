FROM nginx:1.24.0

COPY ./volume-frontend/public/index.html /usr/share/nginx/html/index.html
COPY ./conf/nginx.conf /etc/nginx/nginx.conf
#COPY ./volume-frontend/index.js/ /usr/share/nginx/html/index.js
COPY ./volume-frontend /app/volume-frontend

# Ensure favicon and well-known files are available at /app/ so requests to
# /favicon.ico and /.well-known/... don't return 404 from nginx (location / uses root /app/)
COPY ./volume-frontend/public/favicon.ico /app/favicon.ico
#COPY ./volume-frontend/public/.well-known /app/.well-known

EXPOSE 8080