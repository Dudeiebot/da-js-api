import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

//doing our api calling we need to validate data being to the body of the api routes and this is where joi comes in  //it works together with our mongodb Schema
//Joi hvae some validationOptions also which have equivalent bool value you can assign to them
//joi comes with an error message that help us in our error failing scenario

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            );
            req.body = value;
            next();
        } catch (e: any) {
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).send({ errors: errors });
        }
    };
}

export default validationMiddleware;
