#Stage 1
FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

#Stage 2
FROM nginx:alpine
COPY --from=build app/dist/electric-equipment-ui usr/share/nginx/html
EXPOSE 80
