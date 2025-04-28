FROM node:18-alpine

# Instalar dependências do Chromium
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    alsa-lib \
    libxcomposite \
    libxrandr \
    libxdamage \
    libxkbcommon \
    libstdc++ \
    libc6-compat \
    libgcc

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]