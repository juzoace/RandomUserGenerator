const express = require("express");
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
const helmet = require('helmet');
const toobusy = require('toobusy-js');
const hpp = require('hpp');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require("./config");
const fs = require("fs");
const Whitelist = require("./whiteListModel")
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
        mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`, { useNewUrlParser: true }).then(() => {
          console.log(`Database connected successfully`)
      }).catch(err => { 
          console.log(`Unable to connect with the database ${err}`)
      });
 } else {
    // Connect the database
    mongoose.connect(`mongodb+srv://Uzochukwu:${config.DB_PASSWORD}@application.j1cdp.azure.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true }).then(() => {
      console.log(`Database connected successfully`)
  }).catch(err => { 
      console.log(`Unable to connect with the database ${err}`)
 })

}

const populateData = async () => {

  // let adminData = await Acronym.findOne({ name: "admin" })
  let adminData = await Whitelist.findOne({
    name: "admin"
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