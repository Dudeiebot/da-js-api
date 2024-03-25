import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exception/http.exception';

//this handles all our error in the api routes
//HttpException error gives us http defined
//just to reduce the act of defining errors all the time

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({
        status,
        message,
    });
}

export default errorMiddleware;
