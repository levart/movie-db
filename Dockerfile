FROM node:18-alpine as node-1

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --prod

FROM nginx:alpine

COPY --from=node-1 /app/dist/movie-db/ /usr/share/nginx/html

EXPOSE 80

