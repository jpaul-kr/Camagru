FROM node:24

WORKDIR /app

COPY ./conf/package.json ./package.json
RUN npm install
COPY ./volume-backend ./volume-backend

EXPOSE 3000

CMD ["npm", "start"]