require("dotenv").config();

// import Joi from "@hapi/joi";
const Joi = require("@hapi/joi")
const envVarsSchema = Joi.object({
    APP_PORT: Joi.string(),
    DB_HOST: Joi.string(),
    DB_PORT: Joi.number(),
    DB_DATABASE: Joi.string()
})
.unknown(true)
.required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

module.exports = {
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
    token: process.env.TOKEN_KEY,
    db: {
        database: envVars.DB_DATABASE, 
        port: envVars.DB_PORT,
        host: envVars.DB_HOST,
    }
}