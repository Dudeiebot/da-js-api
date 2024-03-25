import { cleanEnv, str, port } from 'envalid';


//we use envalid to define our environment path maybe development or production
//it necessary when deploying cause all the testing is done in development
function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        MONGO_PATH: str(),
        PORT: port({ default: 3000 }),
        JWT_SECRET: str(),
    });
}

export default validateEnv;
