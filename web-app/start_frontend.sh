#!/bin/bash

# Navigate to the frontend project folder
cd "$(dirname "$0")"

# Optional: ensure we're in the frontend folder
# cd ./frontend  # Uncomment if your frontend is in a subfolder

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Start the frontend using pm2
echo "🚀 Starting frontend with pm2..."
pm2 start "npm run dev" --name frontend

# Optional: Save the pm2 process list
pm2 save

