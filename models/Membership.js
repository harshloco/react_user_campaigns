const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MembershipSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  team_id: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

module.exports = Membership = mongoose.model("memberships", MembershipSchema);
