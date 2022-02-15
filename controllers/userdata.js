const express = require("express");
const router = express.Router();
const mongoosePaginate = require("mongoose-paginate-v2");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
const Profile = require ('../models/questions.js')
const { get } = require("./users");


router.get("/", (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user)
  // res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

router.get("/:userid", async (req, res, next) => {
  try {
    let answers;
    const question = await Question.findById(req.params.questionId);
    question
      ? (answers = await question.populate({
          path: "answers",
          model: "Answer",
        }))
      : res.status(400).json({ error: "No Question Found" });

    answers
      ? res.status(200).json(question)
      : res.status(400).json({ error: error.message });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// - Get All of Current Users Questions
// - Get all Questions Based On Query Of tags(sylvie is working on regexp function (can either be a query or param here - will check in can leave for now)
//POSTING A QUESTION - linking to user
// - pagination of returned data in the '/' get all index route
//CASCADING DELETION OF QUESTIONS -> answers Once we delete the users , current if you delete a question it deletes all answers
