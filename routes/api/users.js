const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// Load Membership model
const Membership = require("../../models/Membership");

// Load Campaigns model
const Campaign = require("../../models/Campaign");

// Load Team model
const Team = require("../../models/Team");

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    console.log(
      "user.mobile_phone : " + user.mobile_phone + " password " + password
    );
    // Check password
    // bcrypt.compare(password, user.password).then(isMatch => {
    if (password === user.mobile_phone) {
      // User matched
      const team_ids = [];
      const user_id = user.id;

      const payload = {
        id: user.id,
        name: user.full_name,
        team_ids: team_ids
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          console.log("token " + token);
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    }
    //});
  });
});

// @route POST api/users/getTeamCampaigns
// @desc get campaigns of a specified team
// @access Public
router.post("/getTeamCampaigns", (req, res) => {
  const campaign_result = [];
  processEachTeam(req);
  async function processEachTeam(req) {
    console.log("Start");
    // for (const item of req.body) {
    //   campaign_result.push(await getTeamDetails(item.team_id));
    //   //await console.log("team id is " + item.team_id);
    // }
    const promises = req.body.map(async fruit => {
      const numFruit = await getTeamDetails(fruit.team_id);
      return numFruit;
    });

    campaign_result.push(await Promise.all(promises));
    //campaign_result.push(numFruits);
    //console.log(console.log(JSON.stringify(numFruits)));
    console.log("End");
    console.log("Done!" + JSON.stringify(campaign_result));

    res.json({
      success: true,
      result: campaign_result
    });
  }

  async function getCampaignDetails(team_id) {
    const campaigns = [];
    await Campaign.find({
      team_id: team_id
    }).then(async result => {
      for (const item of result) {
        //console.log("item : " + JSON.stringify(item));
        campaigns.push(item);
      }
    });

    return campaigns;
  }
  async function getTeamDetails(team_id) {
    const data = [
      await Team.aggregate(
        [
          { $match: { id: team_id } },
          {
            $lookup: {
              from: "campaigns",
              localField: "id",
              foreignField: "team_id",
              as: "campaigns"
            }
          }
        ],
        function(err, result) {
          if (err) throw err;
          console.log("new result :" + JSON.stringify(result));
          return result;
          // data.push(result);
          // console.log("new result :" + JSON.stringify(data));
        }
      )
    ];

    // await Team.findOne({ id: team_id }).then(team => {
    //   console.log("team id " + team.id + " team name " + team.name);

    //   processCampaigns(team.id);
    //   async function processCampaigns(team_id) {
    //     data.push({ team_id: team.id, team_name: team.name });
    //     data.push(await getCampaignDetails(team_id));
    //     console.log(" getCampaignDetails for team id is " + team_id);
    //     //await console.log("team id is " + item.team_id);
    //   }
    // });

    return data;
  }
});

router.post("/getTeams", (req, res) => {
  const team_ids = [];

  console.log("get teams for user id " + req.body.user_id);
  Membership.find({ user_id: req.body.user_id }).then(results => {
    results.forEach((result, memberIndex) => {
      if (!result) {
        //  return res
        //    .status(404)
        //    .json({ teamsnotfound: "Teams not found" });
        // Create JWT Payload
      }
      console.log("result : " + result + " team_id " + result.team_id);
      //console.log("member index : " + memberIndex);

      team_ids.push({ team_id: result.team_id });
    });
    res.json({
      success: true,
      result: team_ids
    });
  });
});
module.exports = router;
