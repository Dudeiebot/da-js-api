
To run this app locally, do the following:

Create a `.env` file with the following contents:
```
NODE_ENV=development
PORT=
MONGO_PATH=da-js-mongodb:27017/dajs
JWT_SECRET=
```

Run `npm install` && `npm run dev`

Build the docker image for dev and prod with this

RUN `docker compose -f docker-compose.dev.yml up --build -d`
 
then for production

RUN `docker compose up --build -d`
