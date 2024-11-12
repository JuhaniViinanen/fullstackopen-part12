FROM node:20
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm ci --omit=dev
USER node
CMD npm start