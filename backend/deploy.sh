#!/bin/bash

# Install production dependencies
echo "Installing production dependencies..."
npm install --production

# Build the application
echo "Building the application..."
npm run build

# Start the application with PM2
echo "Starting the application..."
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup 