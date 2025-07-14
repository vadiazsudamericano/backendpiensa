# --- ETAPA 1: CONSTRUCCIÓN ---
# Usamos una imagen oficial de Node.js v18. La llamamos "builder"
FROM node:18-alpine AS builder

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos TODAS las dependencias para poder compilar
RUN npm install

# Copiamos el resto del código
COPY . .

# ¡EL PASO CLAVE! Creamos la carpeta /dist
RUN npm run build


# --- ETAPA 2: PRODUCCIÓN ---
# Empezamos desde una imagen limpia de Node.js
FROM node:18-alpine

WORKDIR /app

# Copiamos solo los archivos de dependencias
COPY package*.json ./

# Instalamos solo las dependencias de PRODUCCIÓN
RUN npm install --only=production

# Copiamos la carpeta 'dist' ya compilada desde la etapa 'builder'
COPY --from=builder /app/dist ./dist

# Exponemos el puerto 3000
EXPOSE 3000

# El comando para iniciar la aplicación. Como /dist existe, esto funcionará.
CMD ["node", "dist/main"]