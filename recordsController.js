const express = require("express");
const axios = require("axios");
const app = express();
const cors = require('cors');
const redis = require("redis");
// app.use(cors());


const redisPort = 6379
const client = redis.createClient(redisPort);


client.on("error", (err) => {
    console.log(err);
    console.log('worked perfectly')
})
var whitelist = []// Should be gotten from redis
client.keys("*", function(err, keys) {
    if (err) return console.log(err);

    for(var i = 0, len = keys.length; i < len; i++) {
        console.log(keys[i]);
    } 
})
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }



exports.getRecords = async (req, res) => {

    try {
    // Validate Input Data
    const { noOfData, token } = req.query;

    if ( token == undefined || parseInt(noOfData, 10) > 5000 ) {
    // Send resonse to client
    res.status(400).json({message:"Kindly provide: 'noOfData', 'token' in your request query", success: false})
    } else {

        const integerValOfnoOfData = parseInt(noOfData, 10)
        const url = `https://randomuser.me/api/?results=${integerValOfnoOfData}`
        const response = await axios.get(url)
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Failed to fetch data from 3rd party Api"
            })
        })
        const analytics = () => {
            let noOfMale = 0;
            let noOfFemale = 0;
            let noOfChilderen = 0;
            let noOfAdolesence = 0;
            let noOfAdult = 0;
            const noOfPeople = response.data.results.length;

            response.data.results.forEach((data) => {
               
                // Gender check
                if (data.gender == "male") {
                    noOfMale++
                }

                if (data.gender == "female") {
                    noOfFemale++
                }

                // Age group check
                if (data.dob.age < 12) {
                    noOfChilderen++
                }

                if (data.dob.age > 12 && data.dob.age < 18) {
                    noOfAdolesence++
                }

                if (data.dob.age > 19) {
                    noOfAdult++
                }
            })

            // percentage calculations
            function percentage(partialValue, totalValue) {
                return (100 * partialValue) / totalValue;
            }

            const femalePercentage = percentage(noOfFemale, noOfPeople);
            const malePercentage = percentage(noOfMale, noOfPeople) 
            const ageGroupBreakdown = {
                totalNoOfChildren: noOfChilderen,
                totalNoOfAdolesence: noOfAdolesence,
                totalNoOfAdult: noOfAdult
            }
            return {
                malePercentage,
                femalePercentage,
                ageGroupBreakdown
            }

        }

       const finalResult = analytics(response)
        
      res.status(200).json({
          success: true,
          data: finalResult,
          message: "Operation succesful"
      })

    }

    } catch(err) {
        // Send resonse to client
        res.status(500).json(errorMessage("Operation not successful")) 
     
    }
}

exports.whitelistUserEmail = async (req, res) => {
    try {

        const { _id } = req.body
        // console.log(_id)
        console.log(String(_id))
        if ( _id == undefined ) {
            // Send response to client
            res.status(400).json({message:"Kindly provide:'_id' in your request bodyy", success: false})

            } else {
                
                const url = `https://randomuser.me/api/?results=5000`
                const response = await axios.get(url)
                .catch((err) => {
                    res.status(500).json({
                        success: false,
                        message: "Failed to fetch data from 3rd party Api"
                    })
                })


                response.data.results.forEach((data) => {
                    const trueOrFalse = String(data.login.uuid) == String(_id)
                    console.log(trueOrFalse)
                    if ( String(data.login.uuid) == String(_id) ) {
                   
                        // Set new value 
                        client.set(`${data.login.uuid}`, `${data.email}`)

                    
                    }
                })
            }

    } catch(err) {
        // Send resonse to client
        res.status(500).json(errorMessage("Operation not successful")) 
    }
}

