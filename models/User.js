const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  mobile_phone: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);
