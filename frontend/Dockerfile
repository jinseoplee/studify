FROM node:16.16.0

RUN mkdir app && cd /app

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

ENTRYPOINT docker cp studify-frontend:/app/build /var/www/html

