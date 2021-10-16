const router = require('express').Router();
const passport = require('passport');
const { userRegistration, userLogin, userWelcome } = require("./controller/userAuthController");
const { getRecords, whitelistUserEmail,  whitelistRecords, userWhiteListStatus } = require("./controller/recordsController");

/**
 * @swagger
 * /register:
 *   post:
 *     description: Register a user
 *     parameters:
 *       - name: Request body
 *         in: body
 *         description: Request body object
 *         schema:
 *           type: object
 *           required: 
 *             - first_name
 *             - last_name
 *             - email
 *             - password
 *           properties:
 *             first_name: 
 *               type: string
 *             last_name: 
 *               type: string
 *             email: 
 *               type: string  
 *             password:
 *               type: string
 *     responses: 
 *       201:
 *         description: Response body object
 *         schema: 
 *           type: object  
 *           properties: 
 *             message:
 *               type: string
 *             success: 
 *               type: boolean
 *       400:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *       500:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *             
 */
router.post("/register", (req, res, next) => next() , userRegistration)

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login a user
 *     parameters:
 *       - name: Request body
 *         in: body
 *         description: Request body object
 *         schema:
 *           type: object
 *           required: 
 *             - email
 *             - password
 *           properties:
 *             email: 
 *               type: string  
 *             password:
 *               type: string
 *     responses: 
 *       200:
 *         description: Response body object
 *         schema: 
 *           type: object  
 *           properties: 
 *             message:
 *               type: string
 *             success: 
 *               type: boolean
 *       400:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *       500:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *            
 */
router.post("/login", (req, res, next) => next() , userLogin)

/**
 * @swagger
 * /welcome:
 *   post:
 *     description: Try to access a protected route
 *     parameters:
 *       - name: Request body
 *         in: body
 *         description: Request body object
 *         schema:
 *           type: object
 *           required: 
 *             - token
 *           properties:
 *             token: 
 *               type: string  
 *     responses: 
 *       200:
 *         description: Response body object
 *         schema: 
 *           type: object  
 *           properties: 
 *             message:
 *               type: string
 *             success: 
 *               type: boolean
 *       401:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *       500:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]           
 */
router.post("/welcome", passport.authenticate('jwt', {session: false}), (req, res, next) => next() , userWelcome)

/**
 * @swagger
 * /records:
 *   get:
 *     description: Try to access a protected route
 *     parameters:
 *       - in: query
 *         name: token
 *         type: string
 *         required: true
 *       - in: query
 *         name: noOfData
 *         type: string
 *         required: true 
 *     responses: 
 *       200:
 *         description: Response body object
 *         schema: 
 *           type: object  
 *           properties: 
 *             message:
 *               type: string
 *             success: 
 *               type: boolean
 *       400:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *       500:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]  
 * 
 */ 
router.get("/records", (req, res, next) => next(), getRecords )

/**
 * @swagger
 * /getWhiteListRecords:
 *   post:
 *     description: Try get a list of all users which have been whitelisted
 *     responses: 
 *       200:
 *         description: Response body object
 *         schema: 
 *           type: object  
 *           properties: 
 *             message:
 *               type: string
 *             success: 
 *               type: boolean
 *       500:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]  
 * 
 */ 

router.get("/getWhiteListRecords", (req, res, next) => next(), whitelistRecords)


/**
 * @swagger
 * /getUserWhiteListStatus:
 *   post:
 *     description: Try to get a user record togeher with it's whitelist status
 *     parameters:
 *       - name: Request body
 *         in: body
 *         description: Request body object
 *         schema: 
 *           type: object
 *           required:
 *             - _id
 *           properties: 
 *             _id:
 *               type: string
 *     responses: 
 *       200:
 *         description: Response body object
 *         schema: 
 *           type: object  
 *           properties: 
 *             message:
 *               type: string
 *             success: 
 *               type: boolean
 *       400:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *       500:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]  
 * 
 */ 

router.post("/getUserWhiteListStatus", (req, res, next) => next(), userWhiteListStatus)

/**
 * @swagger
 * /whitelist:
 *   post:
 *     description: Try to get a user record togeher with it's whitelist status
 *     parameters:
 *       - name: Request body
 *         in: body
 *         description: Request body object
 *         schema: 
 *           type: object
 *           required:
 *             - _id
 *           properties: 
 *             _id:
 *               type: string
 *     responses: 
 *       200:
 *         description: Response body object
 *         schema: 
 *           type: object  
 *           properties: 
 *             message:
 *               type: string
 *             success: 
 *               type: boolean
 *       400:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *       500:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]  
 * 
 */ 


router.post("/whitelist", (req, res, next) => next(), whitelistUserEmail)

// router.get("/getWhitelisttRecords", (req, res, next) => next(), whitelistRecords)

// ALL other routes return 404 by default
 router.get("*", (req, res) => {
    res.sendStatus(404);
  });

module.exports = router;