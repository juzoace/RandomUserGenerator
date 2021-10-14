const express = require("express");
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const toobusy = require('toobusy-js');
const hpp = require('hpp');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require("./config");
const Whitelist = require("./models/whiteListModel")
const fs = require("fs");
const path = require('path');
require("dotenv").config();
app.use(helmet());
app.use(helmet.noSniff());
app.use(helmet.hsts()); // default configuration
app.use(hpp());
app.use(function(req, res, next) {
  if (toobusy()) {
      // log if you see necessary
      res.send(503, "Server Too Busy");
  } else {
  next();
  }
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));


// Swagger Open Api Options Definition 
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: " Random User Generator",
        description: "This is the swagger documentation for the World Texting Foundation API",
        contact: {
          name: "Nwigwe Uzochukwu"
        },
        servers: [ 
            {
                url:`http://${config.HOST}:${config.PORT}`, 
                description: "Development server"
            } 
        ]
      }
    },
    
 
    apis: ["./routes.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
 
  // Bring in the route
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.use(require('./routes'));

  if(process.env.NODE_ENV == 'development'){ 
        // Connect the database
        mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`).then(() => {
          console.log(`Database connected successfully`)
      }).catch(err => { 
          console.log(`Unable to connect with the database ${err}`)
      });
 } else {
    // Connect the database
    mongoose.connect(`${config.MONGOLAB_URI}`, { useNewUrlParser: true }).then(() => {
      console.log(`Database connected successfully`)
  })
  .catch(err => { 
      console.log(`${err}`)
 })

}


const populateData = async () => {

  // let adminData = await Acronym.findOne({ name: "admin" })
  let adminData = await Whitelist.findOne({
    name: "admin"
  })
  .catch((err) => {

  })
  if (!adminData) {

    const adminWhiteList = new Whitelist({
      name: "admin",

    })

    adminWhiteList.save()


  }

}

populateData()

module.exports = app;