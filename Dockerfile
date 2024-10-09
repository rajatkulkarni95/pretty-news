# Use the LTS Slim Node.js image
FROM node:lts-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml for installing dependencies
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install project dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "run", "dev"]
