FROM node:20 AS base
WORKDIR /usr/src/app
ENV VITE_BACKEND_URL=http://localhost:8080
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=base /usr/src/app/dist /usr/share/nginx/html