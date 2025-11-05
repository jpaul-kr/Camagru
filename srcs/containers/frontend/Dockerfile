FROM nginx:1.24.0

RUN apt-get update && apt-get install -y nginx

WORKDIR /app

COPY ./conf/package.json /package.json

COPY ./volume-frontend/public/favicon.ico /favicon.ico
#COPY ./volume-frontend/public/.well-known /app/.well-known

COPY ./volume-frontend/public/index.html /usr/share/nginx/html/index.html
COPY ./volume-frontend /app/volume-frontend
RUN mv /app/volume-frontend/index.js /usr/share/nginx/html/index.js
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 5000

ENTRYPOINT ["nginx", "-g", "daemon off;"]