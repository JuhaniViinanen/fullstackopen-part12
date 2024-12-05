FROM node:20 AS base
WORKDIR /usr/src/app
COPY . .
RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs20-debian12:nonroot
ENV NODE_ENV=production
USER nonroot
COPY --from=base --chown=nonroot:nonroot /usr/src/app /app
WORKDIR /app
EXPOSE 3000
CMD ["index.js"]