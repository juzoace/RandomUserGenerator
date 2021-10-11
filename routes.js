const router = require('express').Router();
const auth = require("./authMiddleware");
const { userRegistration, userLogin, userWelcome } = require("./userController");
const { getRecords, whitelistUserEmail } = require("./recordsController");

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
router.post("/welcome", auth, (req, res, next) => next() , userWelcome)

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
router.get("/records", auth, (req, res, next) => next(), getRecords )

router.post("/whitelist", (req, res, next) => next(), whitelistUserEmail) 
// ALL other routes return 404 by default
 router.get("*", (req, res) => {
    res.sendStatus(404);
  });

module.exports = router;