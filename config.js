// require("dotenv").config();

// // import Joi from "@hapi/joi";
// const Joi = require("@hapi/joi")
// const envVarsSchema = Joi.object({
//     APP_PORT: Joi.string(),
//     DB_HOST: Joi.string(),
//     DB_PORT: Joi.number(),
//     DB_DATABASE: Joi.string()
// })
// .unknown(true)
// .required();

// const { error, value: envVars } = envVarsSchema.validate(process.env);

// module.exports = {
//     port: process.env.APP_PORT,
//     host: process.env.APP_HOST,
//     token: process.env.TOKEN_KEY,
//     db: {
//         database: envVars.DB_DATABASE, 
//         port: envVars.DB_PORT,
//         host: envVars.DB_HOST,
//     }
// }

const dotenv = require("dotenv")
const path = require("path")

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
})

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,
    TOKEN_KEY: process.env.TOKEN_KEY,
    DB_PASSWORD: process.env.DB_PASSWORD,
    MONGOLAB_URI: process.env.MONGOLAB_URI,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOSTNAME: process.env.REDIS_HOSTNAME,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD
}