const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TeamSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  color_set: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  campaigns: [
    {
      type: Schema.Types.ObjectId,
      ref: "campaigns"
    }
  ]
});

module.exports = Team = mongoose.model("teams", TeamSchema);
