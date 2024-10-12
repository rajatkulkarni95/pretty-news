# Use the official Node.js image
FROM node:lts-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml for installing dependencies
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install project dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN pnpm run build

# Expose the port
EXPOSE 3000

# Command to run the application in production
CMD ["pnpm", "run", "start"]
