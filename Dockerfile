FROM node:20-alpine as development

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./

RUN apk --no-cache add make gcc g++ python3 \
    && npm install \
    && npm install --only=development \
    && apk del make gcc g++ python3

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# Production stage
FROM node:20-alpine as production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm cache clean -force

RUN apk --no-cache add make gcc g++ python3 \
    && npm install -g expo-cli --force \
    && npm rebuild bcrypt --build-from-source \
    && apk del make gcc g++ python3 

RUN npm install dotenv

COPY --from=development /app/dist ./dist

EXPOSE 3000

CMD ["node", "./dist/index.js"]
