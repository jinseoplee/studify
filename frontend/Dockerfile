# Use an official Node.js runtime as the base image
FROM node:16.16.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies specified in the package.json file
RUN npm install --legacy-peer-deps

# Copy the rest of the application files to the container
COPY . .

# Specify the command to run the application
RUN ["npm", "run", "build"]
