FROM node:20-alpine
WORKDIR /web-app

COPY package*.json ./
RUN npm install
COPY . .
ENV NEXT_TELEMETRY_DISABLED = 1
RUN npm run build

# Etapa de producción
EXPOSE 80
CMD ["npm", "start"]