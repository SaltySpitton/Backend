const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
const Profile = require("../models/profiles")

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
      req.logIn(newUser, (err) => {
        if (err) throw err;
      });

      const newProfile = new Profile({
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6rULJa2YoAQgGxO8hQPB-tK-MALfteIoSgw&usqp=CAU",
        user: req.user.id
      })
      await newProfile.save()

      console.log(req.user, "Was Created and LoggedIn");
      console.log(newProfile, " New Profile was created");
      res.send("User Created and LoggedIn");
      // res.redirect('http://localhost:3000/questions');
    }
  });
});

router.get("/", (req, res) => {
  console.log(req.user);
  res.status(200).json(req.user)
  // res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send("user logged out");
  // res.redirect('http://localhost:3000/questions');
  // console.log("user logged out")
});

//EDIT USER
//DELETE USER

module.exports = router;
