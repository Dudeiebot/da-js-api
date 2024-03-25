import Joi from 'joi';

//this is where our validation req.body is being checked and most importantly make the required also in our controller, equally type checking is done here also
const create = Joi.object({
    product: Joi.string().required(),
    productPrice: Joi.number().required(),
});

const update = Joi.object({
    product: Joi.string().required(),
    productPrice: Joi.number().required()
});

export default { create, update };
