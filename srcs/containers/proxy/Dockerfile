FROM nginx:1.24.0

RUN apt-get update && apt-get install -y wget

COPY ./conf/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]