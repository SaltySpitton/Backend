const express = require("express");
const router = express.Router();
const fs = require("fs")
const mongoosePaginate = require("mongoose-paginate-v2");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
const Profile = require ('../models/profiles.js')

router.get("/", async(req,res,next) =>{
  try{
    const profile = await Profile.find({})
    profile ? res.status(200).json(profile) : res.status(400).json({error: error.message})
  } catch(err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const findProfile = await Profile.find({ user: req.params.id }).populate("user")
    findProfile ?  
    res.status(200).json(findProfile) :
    res.status(400).json({error: error.message})

  } catch (err) {
    next(err);
  }
});

router.put('/:profileId/:userId', async (req, res, next) => {
  try {
    console.log(req.body)
    const newProfile = await Profile.findByIdAndUpdate(req.params.profileId,req.body, {new:true}) 
      newProfile?
      res.status(200).json(newProfile) :
      res.status(400).json({ error: error.message })
   } 
  catch(err){
     next(err)
  }
})

module.exports = router;

