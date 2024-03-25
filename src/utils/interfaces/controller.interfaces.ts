import { Router } from 'express';

//handles the routes and path all round the Controller either User or Post
 export default interface Controller {
    path: string;
    router: Router;
}

