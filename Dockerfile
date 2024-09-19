FROM node:18 AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM node:18 AS build

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM node:18 AS production

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/server.js ./server.js

EXPOSE 3333

ENV NODE_ENV=production

CMD ["node", "server"]
