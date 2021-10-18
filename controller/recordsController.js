const axios = require("axios");
const User = require("../models/userModel")
const Whitelist = require("../models/whiteListModel")

exports.getRecords = async (req, res) => {

    try {
    // Validate Input Data
    const { noOfData, token } = req.query;

    if ( token == undefined || parseInt(noOfData, 10) > 5000 ) {
    // Send resonse to client
    return res.status(400).json({message:"Kindly provide: 'noOfData', 'token' in your request query", success: false})
    } else {

        const integerValOfnoOfData = parseInt(noOfData, 10)
        const url = `https://randomuser.me/api/?results=${integerValOfnoOfData}`
        const response = await axios.get(url)
        .catch((err) => {
            return res.status(500).json({
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
       return res.status(200).json({
          success: true,
          data: finalResult,
          message: "Operation succesful"
      })

    }

    } catch(err) {
        // Send resonse to client
        return res.status(500).json({success: false, message:"Operation not successful"}) 
    }
}

exports.whitelistUserEmail = async (req, res) => {
    try {

        const { _id } = req.body
     
        if ( _id == undefined ) {
            // Send response to client
            return res.status(400).json({message:"Kindly provide:'_id' in your request bodyy", success: false})

            } else {
                const updatedUser = await User.findOneAndUpdate( {_id: req.body._id}, {
                    emailIsWhiteListed: true
                }, { useFindAndModify: false })
                if ( updatedUser !== null) {
                    Whitelist.updateOne(
                        { name: "admin"},
                        {$addToSet: {whitelistedEmails: updatedUser.email}},
                        {safe: true}
                    )
                    .then((data) => {
                        
                        if (data.modifiedCount == 1) {
                            // Send resonse to client
                            return res.status(201).json({
                                success: true,
                                message:"Operation successful"
                            })   
                            } else {
                                // Send resonse to client
                            return res.status(400).json({success: false, message: "Email Already Exists"})
                            } 
                    })
                    .catch(() => {
                        // Send failure response
                    return res.status(501).json({
                    success: false,
                    message: "Operation Failed"
                })
                    })
                }

            }

    } catch(err) {
        // Send resonse to client
        return res.status(500).json({
            success: false,
            message: "Operation not successful"
        }) 
    }
}

exports.whitelistRecords = async (req, res) => {
    try {
        const foundUsers = await User.find(
            { name: "admin"}
        )
        .catch((err) => {
            // Send resonse to client
        return res.status(500).json({
            success: false,
            message: "Operation not successful"
        })
        })
        let whitelistArray = []

        foundUsers.forEach((user) => {
            whitelistArray.push(
                {
                    firstname: user.first_name,
                    lastname: user.last_name,
                    whitelist_status: user.emailIsWhiteListed,
                    userId: user._id
                }
            )
        })
      
        // Send resonse to client
        return res.status(200).json({
            success: true,
            message:"Operation successful",
            data: whitelistArray
        })

    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Operation not successful"
        })
    }
}


exports.userWhiteListStatus = async (req, res) => {
    try{
        const {_id } = req.body;

        if ( _id == undefined ) {
             // Send resonse to client
             return res.status(400).json({message:"Kindly provide: '_id' in your request body", success: false})
        } else {
            const foundUser = await User.find({name: "admin", _id: _id})
            .catch((err) => {
                // Send resonse to client
            return res.status(500).json({
                success: false,
                message: "Operation not successful"
            })
            })
             // Send resonse to client
             return res.status(200).json({
            success: true,
            message:"Operation successful",
            whitelistStatus: foundUser[0].emailIsWhiteListed
        })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Operation not successful"
        })
    }
}