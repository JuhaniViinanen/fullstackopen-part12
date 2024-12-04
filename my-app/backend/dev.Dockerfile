FROM node:20.18.1-bookworm-slim
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["npm", "run", "dev", "--", "--legacy-watch"]