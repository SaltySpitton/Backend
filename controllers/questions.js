const express = require("express");
const router = express.Router();
const mongoosePaginate = require("mongoose-paginate-v2");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
const { get } = require("./users");
const validateJoiSchema = require("../middleware/joiSchema");
const ExpressError = require("../middleware/expressError");

// example       http://localhost:4200/questions?page=1&size=4   
//page is the "offset, or starting page, size is the total items per page you want returned"
router.get("/", async (req, res, next) => {
  const getPagination = (page, size) => {
    const limit = size ? +size : 9999;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };
  try {
    if (req.query) {
      const { page, size, tags } = req.query;
      //const { page, size, tags, title } = req.query;
        // let postTitle = new RegExp(title, "i")
        let condition = tags ? 
        { tags: { $regex: new RegExp(tags), $options: "i" } }  :
        {};
        const { limit, offset } = getPagination(page - 1, size);
//.find({$or: [ {title}, {tags: {$in : tags.split(',')} }] })
      allQuestions = await Question.paginate(condition, { offset, limit, populate: "user" })
      // allQuestions = await Question.paginate({ $or : [ { postTitle }, {condition}, { offset, limit, populate: "user" } ]})
      // .populate('user')
      // .populate('answers')
      // .populate({
      //   path: 'answers', 
      //   populate: {
      //     path: 'user'
      //   }
      // })
      // .populate()
        .then((data) => {
          console.log(data)
          res.status(200).json({
            totalItems: data.totalDocs,
            questions: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: error.message || "Error while retrieving Questions",
          });
        });
      }
  //   } else {
  //     allQuestions = await Question.find({});
  //     allQuestions
  //       ? res.status(200).json(allQuestions)
  //       : res.status(404).json({
  //           error: error.message || "Error while retrieving Questions",
  //         });
  //   }
  } catch (err) {
    next(err);
  }
});

//post a new question - linked to User Profile : LEAVING FOR UPDATES
router.post("/:userId", validateJoiSchema, async (req, res, next) => {
  try {
    const questionData = {
      ...req.body,
      user: req.params.userId,
    };
    const newQuestion = await Question.create(questionData);
    newQuestion
      ? res.status(200).json(newQuestion)
      : res.status(404).json({ error: error.message });
  } catch (err) {
    next(err);
  }
});

//View a question - will populate the answers as well
router.get("/:questionId", async (req, res, next) => {
  try {
    let answers;
  
    const question = await Question.findById(req.params.questionId);
    const user = await User.findById(question.user)
    question ? 
      (answers = await question.populate({
          path: "answers",
          model: "Answer",
          populate: {
            path: 'user', 
            model: 'User'
          }
        })) :
      res.status(404).json({ error: "No Question Found" });
    answers
      ? res.status(200).json({...question, user})
      : res.status(404).json({ error: error.message });
  } catch (err) {
    next(err);
  }
});

//delete a question
router.delete("/:questionId", async (req, res, next) => {
  try {
    const deleteQuestion = await Question.findOneAndDelete({
      _id: req.params.questionId,
    });
    deleteQuestion
      ? res.status(200).json(deleteQuestion)
      : res.status(40).json({ error: error.message });
  } catch (err) {
    next(err);
  }
});

//edit a question
router.put("/:questionId", async (req, res, next) => {
  try {
    const editQuestion = await Question.findByIdAndUpdate(
      req.params.questionId,
      req.body
    );
    editQuestion
      ? res.status(200).json(editQuestion)
      : res.status(404).json({ error: error.message });
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
