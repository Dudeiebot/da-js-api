import { Request, Response, NextFunction } from 'express';
import token from '@/utils/token';
import UserModel from '@/resources/user/user.model';
import Token from '@/utils/interfaces/token-interface';
import HttpException from '@/utils/exception/http.exception';
import jwt from 'jsonwebtoken';

//middleware created for authenticating user after they register and before giving them access to the other,api routes in the program
//so this is how it works, we have the Users in our resources which is our main entry api point
//the user get to register and login, given a bearer token-interface
//we need bearer token to access the remaining api routes like creating product, get all product, update product and delete product
//our func here is taking care of the bearer token and the unauthorization
//jwt help us in handling it
async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Unauthorised'));
    }

    const accessToken = bearer.split('Bearer ')[1].trim();
    try {
        const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(
            accessToken
        );

        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorised'));
        }

        const user = await UserModel.findById(payload.id)
            .select('-password')
            .exec();

        if (!user) {
            return next(new HttpException(401, 'Unauthorised'));
        }

        req.user = user;

        return next();
    } catch (error) {
        return next(new HttpException(401, 'Unauthorised'));
    }
}

export default authenticatedMiddleware;
