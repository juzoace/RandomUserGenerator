const router = require('express').Router();
const auth = require("./authMiddleware");
const { userRegistration, userLogin, userWelcome } = require("./userController");
const { getRecords } = require("./recordsController");
router.post("/register", (req, res, next) => next() , userRegistration)
router.post("/login", (req, res, next) => next() , userLogin)
router.post("/welcome", auth, (req, res, next) => next() , userWelcome)
router.get("/records", auth, (req, res, next) => next(), getRecords )
 // ALL other routes return 404 by default
 router.get("*", (req, res) => {
    res.sendStatus(404);
  });

module.exports = router;