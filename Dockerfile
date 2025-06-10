# Base image
FROM node:18-alpine

WORKDIR /app

COPY web-app/package.json web-app/package-lock.json* ./
RUN npm install

COPY web-app/ ./
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
