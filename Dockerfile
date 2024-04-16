# FROM redis:latest

# # Add any additional configuration or setup steps here

# Use Node.js LTS version as base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "start:dev"]
