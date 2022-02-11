const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});
router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err){
        await res.status(400).json({error: error.message})
    }
    if (doc){
        await res.status(200).json(doc)
    }
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});



router.get("/", async(req, res, next) => {
  try{
      const user = await User.find({})
      user ?
      res.status(200).json(user) :
      res.status(400).json({error: error.message})
  }catch(err){
    next(err)
  }
  console.log(req.user);
  // res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});


router.get('/logout', async(req,res,next) => {
    try{
        const logout = await req.logout()
        res.status(200).json({message: 'User Succesfully Logged Out'})

    }catch(err){
      next(err)
    }    
})

//EDIT USER 
//DELETE USER

module.exports = router;
