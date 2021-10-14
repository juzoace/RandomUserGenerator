const mongoose = require("mongoose");

const WhiteListSchema = new mongoose.Schema({
    name: {
        type: String
    },
    whitelistedEmails: [
        String
    ]
})

module.exports = mongoose.model("Whitelist", WhiteListSchema );