FROM node:16.16.0

RUN mkdir app && cd app

WORKDIR /app

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

ENTRYPOINT ["npm", "run", "build"]

