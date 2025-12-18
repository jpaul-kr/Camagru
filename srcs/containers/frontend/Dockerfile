FROM nginx:1.24.0

RUN apt-get update && apt-get install -y nginx

WORKDIR /usr/share/nginx/html

COPY ./conf/package.json /package.json

#COPY ./volume-frontend/public/favicon.ico /favicon.ico
#COPY ./volume-frontend/public/.well-known /app/.well-known

COPY ./volume-frontend ./volume-frontend
RUN mv ./volume-frontend/public/index.html ./index.html
RUN mv ./volume-frontend/public/style.css ./style.css
RUN mv ./volume-frontend/fonts/ ./fonts/
RUN mv ./volume-frontend/images/ ./images/
RUN mv ./images/favicon.ico ./favicon.ico
RUN mv ./volume-frontend/index.js ./index.js
RUN mv ./volume-frontend/myHtml.js ./myHtml.js
COPY ./conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 5000

ENTRYPOINT ["nginx", "-g", "daemon off;"]