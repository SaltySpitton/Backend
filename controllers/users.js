const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
const Profile = require("../models/profiles")

router.get("/", (req, res) => {
  res.status(200).json(req.user)
})

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if(!user) res.status(500).json("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).json(req.user);
        console.log(req.user);
      })
    }
  })(req, res, next);
})

router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.status(404).json("User Already Exists"); //res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      })

      await newUser.save();
      console.log(newUser)
      req.logIn(newUser, (err) => {
        if (err) throw err;
      })

      const newProfile = new Profile({
        user: req.user.id
      })

      await newProfile.save()
      console.log(req.user, "Was Created and LoggedIn")
      console.log(newProfile, " New Profile was created")
      res.status(200).json(req.user.id)
    }
  })
})

router.post("/logout", (req, res) => {
  req.logout();
  res.send("user logged out");
})

router.get("/:userId/questions", async(req,res,next) => {
   try{
    const allUserQuestions = await Question.find({user: req.params.userId}).populate("answers")
    allUserQuestions ? 
    res.status(200).json(allUserQuestions) :
    res.status(404).json({ error: error.message })
  }catch(err){
    next(err)
  }
})

router.get("/:userId/answers", async(req,res,next) => {
  try{
   const allUserAnswers = await Answer.find({user: req.params.userId}).populate("answers")
   allUserAnswers ? 
   res.status(200).json(allUserAnswers) :
   res.status(404).json({ error: error.message })
 }catch(err){
   next(err)
 }
})

router.put("/:userId", async(req,res,next) => {
  try{
   const updateUser = await User.findByIdAndUpdate(req.params.userId, req.body)
   await updateUser.save()
   updateUser ? 
   res.status(200).json(updateUser) :
   res.status(404).json({ error: error.message })
 }catch(err){
   next(err)
 }
})



module.exports = router;
