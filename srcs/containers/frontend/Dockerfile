FROM nginx:1.24.0

COPY ./volume-frontend/public/index.html /usr/share/nginx/html/index.html
COPY ./conf/nginx.conf /etc/nginx/nginx.conf
#COPY ./volume-frontend/index.js/ /usr/share/nginx/html/index.js
COPY ./volume-frontend /app/volume-frontend

EXPOSE 8080