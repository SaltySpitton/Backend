const { mongo } = require("mongoose");
const mongoose = require("../db/connection");
const mongoosePaginate = require("mongoose-paginate-v2");
const { query } = require("express");
const Answer = require("./answers")

const questionSchema = new mongoose.Schema(
  {
    tags: {
      type: Array,
      required: true,
      
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

questionSchema.post("findOneAndDelete", async function (question) {
  if (question.answers.length > 0) {
    const deleteRes = await Answer.deleteMany({
      _id: { $in: question.answers },
    });
    console.log(deleteRes);
  }
});

questionSchema.plugin(mongoosePaginate);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
