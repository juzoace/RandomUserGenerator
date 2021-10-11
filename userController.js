const User = require("./userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidationRules,
  loginValidationRules,
  welComeValidationRules
} = require("./validation");

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
            res.status(400).send("All input is required");
          }
      
          // check if user already exist
          // Validate if user exist in our database
          const oldUser = await User.findOne({ email });
      
          if (oldUser) {
            return res.status(400).send("User Already Exist. Please Login");
          }
      
          //Encrypt user password
          encryptedPassword = await bcrypt.hash(password, 10);
      
          // Create user in our database
          const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
          });
      
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          // save user token
          user.token = token;
      
          // return new user
          res.status(201).json(user);
      } else {
        res.status(400).json(errorMessage("Invalid data"))
      }
      
      } catch (err) {
        // Send resonse to client
        res.status(500).json(errorMessage("Operation not successful")) 
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
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        } else {
          res.status(400).send("Invalid Credentials");
        }

    } else {
        res.status(400).json(errorMessage("Invalid data"))
    }

      } catch (err) {
              // Send resonse to client
              res.status(500).json(errorMessage("Operation not successful")) 
      }

}

exports.userWelcome = async (req, res) => {
    res.status(200).send("Welcome 🙌 ");
}