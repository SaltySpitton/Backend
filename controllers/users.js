const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
const Profile = require("../models/profiles")

router.get("/", async (req, res, next) => {
  // const { users } = req.query
  try{
    // if(req.query){
    //   const username = new RegExp(searchQuery, "i") 
    //   const matchingUsers = await User.find({username})
    //   matchingUsers ?
    //   res.status(200).json(matchingUsers) :
    //   res.status(500).json({message: 'No User Found'})
    // } 
    console.log(req.user);
    res.status(200).json(req.user)
  }catch(err){
    next(err)
  }
  // res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});




router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if(!user) res.status(500).json("No User Exists");
    // if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).json(req.user);
        // res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});
router.post("/register", (req, res) => {
  console.log(req.body)
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      });

      await newUser.save();
      console.log(newUser)
      req.logIn(newUser, (err) => {
        if (err) throw err;
      });
      const newProfile = new Profile({
        user: req.user.id
      })
      await newProfile.save()
      console.log(req.user, "Was Created and LoggedIn");
      console.log(newProfile, " New Profile was created");
      res.status(200).json(req.user.id);
      // res.send("User Created and LoggedIn");
      // res.redirect('http://localhost:3000/questions');
    }
  });
});


router.post("/logout", (req, res) => {
  req.logout();
  res.send("user logged out");
  // res.redirect('http://localhost:3000/questions');
  // console.log("user logged out")
});


router.get("/:userId/questions", async(req,res,next) => {
   try{
    const allUserQuestions = await Question.find({user: req.params.userId}).populate('answers')
    allUserQuestions ? 
    res.status(200).json(allUserQuestions) :
    res.status(404).json({ error: error.message });
  }catch(err){
    next(err)
  }
})

//EDIT USER
//DELETE USER

module.exports = router;
