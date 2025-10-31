FROM node:18

WORKDIR /app

COPY ./conf/package.json /app/package.json
RUN npm install
COPY ./volume-backend /app/

CMD ["npm", "start"]