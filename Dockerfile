FROM node:17-alpine as api
LABEL authors="tom"

WORKDIR /app

COPY packages/server/package.json ./

# install only production dependencies
RUN npm install --omit=dev

ENV NODE_ENV=production

COPY packages/server/ ./

CMD ["node", "index.js"]


FROM node:18 as build-client

WORKDIR /app

COPY packages/theme/package.json ./

RUN npm install

COPY packages/theme/ ./

RUN npm run build

FROM nginx:1.27.2-alpine as webhost

COPY --from=build-client /app/dist /var/www/html

COPY ./.docker/server.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]