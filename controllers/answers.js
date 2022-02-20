const express = require("express");
const router = express.Router();
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
const { append } = require("express/lib/response");

// Once play with front end - I believe we can take the :questionId param OFF of:
//viewing specefic answer
//deleting specific answer
// editing specefic answer

//post new Answer - only available when logged in
router.post("/:questionId/:userId", async (req, res, next) => {
  try {
    //currentUser to be edited once have exact pulling needs : params will be deleted
    //const currentUser = await User.findOne({username: req.passport.username})
    const findQuestion = await Question.findById(req.params.questionId);
    const userAnswer = {
      ...req.body,
      user: req.params.userId,
    };

    const newAnswer = await Answer.create(userAnswer);
    const addedAnswer = await findQuestion.answers.push(newAnswer);
    await findQuestion.save();

    addedAnswer
      ? res.status(200).json(newAnswer)
      : res.status(400).json({ error: error.message });
  } catch (err) {
    next(err);
  }
});

//get : VIEW Specefic Answer:
router.get("/:answerId", async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.answerId).populate("user")
    answer
      ? res.status(200).json(answer)
      : res.status(400).json({ error: "Error No Answer Found" });
  } catch (err) {
    next(err);
  }
});

//delete  ANSWER
router.delete("/:questionId/:answerId", async (req, res, next) => {
  try {
    const deleteAnswer = await Answer.findByIdAndDelete(req.params.answerId);
    const question = await Question.findById(req.params.questionId);
    await question.save();
    await question.populate({
      path: "answers",
      model: "Answer",
    });

    deleteAnswer
      ? res.status(200).json(deleteAnswer)
      : res.status(400).json({ error: error.message });
  } catch (err) {}
});

//EDIT SPECEFIC ANSWER
//router.put("/:questionId/:answerId", async (req, res, next) => {
router.put("/:answerId", async (req, res, next) => {
  const updatedAnswer = await Answer.findOneAndUpdate(
    { _id: req.params.answerId },
    req.body,
    { new: true }
  )
  // updatedAnswer.save()
  updatedAnswer
    ? res.status(200).json({updatedAnswer})
    : res.status(400).json({ error: error.message });
});

module.exports = router;
