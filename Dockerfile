# --- ETAPA 1: CONSTRUCCIÓN ---
# Usamos Node 20, que es lo que tus dependencias prefieren
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./

# Usamos la bandera que reduce el consumo de memoria
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build


# --- ETAPA 2: PRODUCCIÓN ---
# Usamos Node 20 también en la imagen final
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./

# Aquí también podemos usar la bandera por consistencia
RUN npm install --only=production --legacy-peer-deps

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]