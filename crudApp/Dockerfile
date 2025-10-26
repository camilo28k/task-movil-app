# Etapa 1: Construcción del frontend
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor NGINX
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto 8001 (donde servirá la app)
EXPOSE 8001

# Modificamos el puerto por defecto de Nginx
RUN sed -i 's/80/8001/g' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]


