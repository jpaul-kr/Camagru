FROM node:24

RUN apt-get update && apt-get install -y nginx

WORKDIR /app

COPY ./conf/package.json /package.json

RUN npm install

COPY ./conf/nginx.conf /etc/nginx/nginx.conf
COPY ./volume-frontend/public/index.html /usr/share/nginx/html/index.html
COPY ./volume-frontend /app/volume-frontend
RUN mv /app/volume-frontend/index.js /usr/share/nginx/html/index.js

COPY ./volume-frontend/public/favicon.ico /favicon.ico
#COPY ./volume-frontend/public/.well-known /app/.well-known

EXPOSE 5000

CMD ["npm", "start"]
#CMD ["nginx", "-g", "daemon off;"]