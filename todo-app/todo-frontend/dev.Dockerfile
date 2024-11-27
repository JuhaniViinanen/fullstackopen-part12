FROM node:20.18.1-bookworm-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]