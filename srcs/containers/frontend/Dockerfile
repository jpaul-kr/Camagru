FROM nginx:1.24.0

RUN apt-get update && apt-get install -y nginx

WORKDIR /usr/share/nginx/

COPY ./conf/package.json /package.json

#COPY ./volume-frontend/public/favicon.ico /favicon.ico
#COPY ./volume-frontend/public/.well-known /app/.well-known

COPY ./volume-frontend/public/index.html /usr/share/nginx/html/index.html
COPY ./volume-frontend ./volume-frontend
RUN mv ./volume-frontend/public/style.css ./html/style.css
RUN mv ./volume-frontend/fonts/ ./html/fonts/
RUN mv ./volume-frontend/images/ ./html/images/
RUN mv ./volume-frontend/index.js /usr/share/nginx/html/index.js
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 5000

ENTRYPOINT ["nginx", "-g", "daemon off;"]