const Joi = require("joi");

const registerValidationRules = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().min(1).max(255).required(),
        last_name: Joi.string().min(1).max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    });
    return schema.validate(data);
}

const loginValidationRules = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    });
    return schema.validate(data);
}

const welComeValidationRules = (data) => {
    const schema = Joi.object({

    });
    return schema.validate(data);
}

const noOfRecordsValidationRules = (data) => {
    const schema = Joi.object({
       token: Joi.string().min(1).max(1040).required(),
       noOfData: Joi.number()
    });
    return schema.validate(data);
}

module.exports = {
    registerValidationRules,
    loginValidationRules,
    welComeValidationRules,
    noOfRecordsValidationRules
}