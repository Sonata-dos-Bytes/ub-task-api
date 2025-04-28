FROM node:18-alpine

# Instalar dependências do Chromium
RUN apk add --no-cache \
    libnss3 \
    libatk \
    libatk-bridge2.0 \
    libcups \
    libxcomposite \
    libxrandr \
    libxdamage \
    libxkbcommon \
    libgbm \
    pango \
    alsa-lib

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]