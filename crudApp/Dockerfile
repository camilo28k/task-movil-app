# Etapa 1: Construir la app con Node
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir la app con Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 9000
EXPOSE 9000

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
