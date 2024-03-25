import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import PostController from '@/resources/post/post.controller';
import UserController from '@/resources/user/user.controller';

//our entry point, we are using dotenv a lib in TS to call our ENV file
//we have the Post ontroller and the User controller also in our app and it is also listening to our app.ts
//our PostController and UserController handles all the routes related to our post and user 
validateEnv();

const app = new App(
    [new PostController(), new UserController()],
    Number(process.env.PORT)
);

app.listen();
