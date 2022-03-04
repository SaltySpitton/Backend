const express = require("express");
const router = express.Router();
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
const { append } = require("express/lib/response");

// GET ALL ANSWERS: for search queries (dani)
// router.get("/", async (req, res, next) => {
//   try {
//     const allAnswers = await Answer.find({})
//     allAnswers
//       ? res.status(200).json(allAnswers)
//       : res.status(400).json({ error: error.message })
//   } catch (err) {
//     next(err)
//   }
// })

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

    const newAnswer = await Answer.create(userAnswer)
    const addedAnswer = await findQuestion.answers.push(newAnswer);
    const answerRes = await Answer.findById(newAnswer._id).populate('user')
    await findQuestion.save();

    addedAnswer
      ? res.status(200).json(answerRes)
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
    const question = await Question.findByIdAndUpdate(req.params.questionId, { $pull: { answers: req.params.answerId } });
    const deleteAnswer = await Answer.findByIdAndDelete(req.params.answerId);
    console.log("Answer Deleted:", deleteAnswer)
    console.log("Question Updated:", question)

    deleteAnswer
      ? res.status(200).json(deleteAnswer)
      : res.status(400).json({ error: error.message });
  } catch (err) {}
});


//sylvie edit answer / Put route (votes etc)
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


//EDIT SPECEFIC ANSWER : old version
// router.put("/:questionId/:answerId", async (req, res, next) => {
//   const updatedAnswer = await Answer.findOneAndUpdate(
//     { _id: req.params.answerId },
//     req.body,
//     { new: true }
//   );
//   // updatedAnswer.save()
//   updatedAnswer
//     ? res.status(200).json(updatedAnswer)
//     : res.status(400).json({ error: error.message });
// });

module.exports = router;
