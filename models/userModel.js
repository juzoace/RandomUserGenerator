const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  hash: { type: String, required: true },
  salt:  { type: String, required: true },
  token: { type: String },
  emailIsWhiteListed: {type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);
