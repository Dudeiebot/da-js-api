import Joi from 'joi';

const create = Joi.object({
    product: Joi.string().required(),
    productPrice: Joi.number().required(),
});

const update = Joi.object({
    product: Joi.string().required(),
    productPrice: Joi.number().required()
});

export default { create, update };
