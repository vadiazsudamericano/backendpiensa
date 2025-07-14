# ETAPA 1: CONSTRUCCIÓN
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos los archivos de dependencias de pnpm
COPY package.json pnpm-lock.yaml* ./

# Instalamos pnpm y luego las dependencias de forma eficiente
RUN npm install -g pnpm
RUN pnpm install

# Copiamos el resto del código y construimos
COPY . .
RUN pnpm run build


# ETAPA 2: PRODUCCIÓN
FROM node:20-alpine
WORKDIR /app

COPY package.json ./
# Instalamos solo las dependencias de producción con pnpm
RUN npm install -g pnpm
RUN pnpm install --prod

# Copiamos la aplicación compilada desde la etapa 'builder'
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]