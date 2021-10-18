const User = require("../models/userModel")
const utils = require('../util');
const {
  registerValidationRules,
  loginValidationRules
} = require("../validation");

exports.userRegistration = async (req, res) => {

    try {
          // Validate data
    const result = registerValidationRules(req.body)
    const { value, error } = result; 
    const valid = error == null;

      if (valid) {
          // Get user input
          const { first_name, last_name, email, password } = req.body;
    
          // Validate user input
          if (!(email && password && first_name && last_name)) {
            return res.status(400).send("All input is required");
          }
      
          // check if user already exist
          const oldUser = await User.findOne({ email });
      
          if (oldUser) {
            return res.status(400).send("User Already Exist. Please Login");
          }
           //   Generate hash and salt from the password
           const saltHash = utils.genPassword(req.body.password);
           const salt = saltHash.salt;
           const hash = saltHash.hash;
          // Create user in our database
          const newUser = await new User({
            first_name,
            last_name,
            email: email, 
            hash: hash,
            salt: salt
          });
          newUser.save()
          .then((user) => {
            const jwt = utils.issueJWT(user);

            return res.satus(200).json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires})
          })
          .catch(() => {
             // Send resonse to client
          return res.status(500).json({
          success: false,
          message: "Operation not successful"
        })
          })
         
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid Input data"
        })
      }
      
      } catch (err) {
        // Send resonse to client
        return res.status(500).json({
          success: false,
          message: "Operation not successful"
        }) 
      }

}

exports.userLogin = async (req, res) => {

    try {

    // Validate data
    const result = loginValidationRules(req.body)
    const { value, error } = result; 
    const valid = error == null;

      if (valid) {

        // Get user input
        const { email, password } = req.body;
  
        // Validate if user exist in our database
        const user = await User.findOne({ email: email });
     
        if (user && ( utils.validPassword(password, user.hash, user.salt)  )   ) {
          const tokenObject = utils.issueJWT(user);      
          return res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires})
        } else {
          return res.status(400).send("Invalid Credentials");
        }

    } else {
      return res.status(400).json({
        success: false,
        message: "Operation not successful"
      })
    }

      } catch (err) {
              // Send resonse to client
              return res.status(500).json({success: false, message: "Operation not successful"}) 
      }
}

exports.userWelcome = async (req, res) => {
  return res.status(200).send("Welcome 🙌 ");
}