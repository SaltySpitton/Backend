const mongoose = require("./connection");
const Question = require("../models/questions.js");
const Answer = require("../models/answers");
const User = require("../models/users");
const Profile = require("../models/profiles");

const userSeeds = require("./userSeeds.json");
const profileSeeds = require("./profileSeeds.json");
const questionSeeds = require("./questionSeeds.json");
const answerSeeds = require("./answerSeeds.json");

// User.deleteMany({})
//   .then(() => {
//     return User.insertMany(userSeeds)
//   })
//   .then((data) => console.log(data))
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     process.exit();
//   });
  

Profile.deleteMany({})
  .then(() => {
    return User.insertMany(profileSeeds)
  })
  .then((data) => console.log(data))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    process.exit();
  });


// Question.deleteMany({})
//   .then(() => {
//     return Question.create(questionSeeds);
//   })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err))
//   .finally(() => {
//     process.exit();
//   });

// Answer.deleteMany({})
//   .then(() => {
//     return Answer.create(answerSeeds);
//   })
//   .then((data) => console.log(data))
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     process.exit();
//   });
