const { mongo } = require("mongoose");
const mongoose = require("../db/connection");

const questionSchema = new mongoose.Schema({
  // date: {
  //   type: String,
  //   required: true,
  // },
  tags: {
    type: [String],
    // enum: [
    //   "html",
    //   "css",
    //   "java",
    //   "javascript",
    //   "node.js",
    //   "mongoose",
    //   "mongodb",
    //   "react",
    //   "jquery",
    //   "jsx",
    //   "python",
    //   "json",
    //   "django",
    //   "ejs",
    //   "other",
    // ],
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
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer"
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
  }, 
  {timestamps: true}
);

questionSchema.post('findOneAndDelete', async function(question){
  if(question.answers.length > 0 ){
    const deleteRes = await Answer.deleteMany({_id: {$in: question.answers}})
    console.log(deleteRes)
  }
})

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
