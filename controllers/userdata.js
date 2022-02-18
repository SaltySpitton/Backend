const express = require("express");
const router = express.Router();
const mongoosePaginate = require("mongoose-paginate-v2");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
const Profile = require ('../models/profiles.js')
//const { get } = require("./users");
//  committ update

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

    let userId = req.params.id
    const findProfile = await Profile.find({ user: userId })

      res.status(200).json(findProfile)
  
  } catch (err) {
    next(err);
  }
});

router.put('/:profileId/:userId', async (req, res, next) => {
  try {
    const newProfile = await Profile.findByIdAndUpdate(req.params.profileId,req.body, {new:true}) 
      newProfile?
      res.status(200).json(newProfile) :
        res.status(400).json({ error: error.message })
   } 
  catch(err){
     next(err)
  }
})

// post 
// router.post('/:profileId/:userId', async(req,res, next) => {
//   try{
//       //currentUser to be edited once have exact pulling needs : params will be deleted
//       //const currentUser = await User.findOne({username: req.passport.username})
//       const profileId = req.params.profileId
//       const userId = req.params.userId
      
//       const newProfile = await Profile.create(req.body)
//       const findUser = await User.findById(userId)

//       // const userProfile = {
//       //     ...req.body, 
//       //     user: req.params.userId
//       // }

//       await newProfile.save()
//       const findProfile = await Profile.findByIdAndUpdate(profileId,newProfile)
//       //const addedAnswer = await findQuestion.answers.push(newAnswer) 
//       await findProfile.save()

//       newProfile ?
//       res.status(200).json(newProfile) :
//       res.status(400).json({error: error.message})

//   }catch(err){
//       next(err)
//   }
// })




module.exports = router;

