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
                url:`http://${config.db.host}:${config.db.port}`, 
                description: "Development server"
            } 
        ]
      }
    },
    
    // apis: ['./routes/*.js']
    apis: ["./routes.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
 
  // Bring in the route
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use(require('./routes'));

      // Connect the database
      mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`, { useNewUrlParser: true }).then(() => {
        console.log(`Database connected successfully`)
    }).catch(err => { 
        console.log(`Unable to connect with the database ${err}`)
    });
    
    module.exports = app;