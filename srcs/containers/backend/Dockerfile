FROM node:24

WORKDIR /app

COPY ./conf/package.json ./package.json
RUN npm install
COPY ./volume-backend ./volume-backend

RUN npm install mariadb
RUN npm install axios
RUN npm install dotenv
RUN npm install bcryptjs
RUN npm install nodemailer

EXPOSE 3000

CMD ["npm", "start"]