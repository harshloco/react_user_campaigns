const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CampaignSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  hashtags: {
    type: String,
    required: true
  },
  description: {
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

module.exports = Campaign = mongoose.model("campaigns", CampaignSchema);
