# Etapa 1: Build del proyecto
FROM node:20-alpine AS build
WORKDIR /app


COPY crudApp/package*.json ./
WORKDIR /app/crudApp
RUN npm install

# Copiar todo el código fuente
COPY crudApp/ ./

# Construir la app
RUN npm run build

# Etapa 2: Servir con NGINX
FROM nginx:alpine
COPY --from=build /app/crudApp/dist /usr/share/nginx/html

EXPOSE 8001
CMD ["nginx", "-g", "daemon off;"]



