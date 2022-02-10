const express = require("express");
const router = express.Router();
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
// const req = require("express/lib/request");

//POTENTIALLY WILL COME BACK TO ADD BACKEND CHECKS & HARD STOPS IF DATA IS NOT PRESENT : like if no title (I know the schema stops that but maybe something extra for another thing?)/ etc


//get all questions - may filter based on tags on front end
            //I believe querying based off tags will be done via a filter in the front end?

            //pagination - all question route : INDEX [stretch]
router.get('/', async(req,res,next) => {
    try{
        const allQuestions = await Question.find({})
        allQuestions ? 
        res.status(200).json(allQuestions) :
        res.status(400).json({error: error.message})
    }catch(err){
       next(err)
    }
})

//post a new question - linked to User Profile 
router.post('/:userId', async(req,res, next) => {
    try{
        //params will be replaced with passport info once used, we will pull the current session user and params will be deleted
        const questionData = {
            ...req.body, 
            user: req.params.userId
        }
        const newQuestion = await Question.create(questionData)
        newQuestion ? 
        res.status(200).json(newQuestion) :
        res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})

//View a question - will populate the answers as well
router.get('/:questionId', async(req,res,next) => {
    try{
        let answers
        const question = await Question.findById(req.params.questionId)
        question ? 
        // answers = await question.populate('answers') :
        answers = await question.populate({
            path: 'answers',
            model: 'Answer'
        }) :
        res.status(400).json({error: 'No Question Found'})

        answers ? 
        res.status(200).json(question) : 
        res.status(400).json({error: error.message})

    }catch(err){
        next(err)
    }
})

//delete a question
router.delete('/:questionId', async(req,res,next) => {
    try{
        const deleteQuestion = await Question.findOneAndDelete({_id: req.params.questionId})
        deleteQuestion ? 
        res.status(200).json(deleteQuestion) :
        res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})

//edit a question
router.put('/:questionId', async(req,res,next) => {
    try{
        const editQuestion = await Question.findByIdAndUpdate(req.params.questionId, req.body)
        editQuestion ?
        res.status(200).json(editQuestion) :
        res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})

module.exports = router;

//get All of User's Questions : **** DO we want this route here or on the user's route?
                // To view all of specific users questions  most likely accessed via user Profile



//view all questions written from user : moved to user route
//router.get('/:userId', async(req,res, next) => {
//     try{
//         //const user = await User.find({})
//         const questions = await Question.find({user: req.params.userId})
//         questions ?
//         res.status(200).json(questions) :
//         res.status(400).json({error: error.message})
//     }catch(err){
//         next(err)
//     }
// })



// router.get('/:searchTag', async(req,res, next) => {
//     try{
//         // const searchTag = req.params.searchTag
//         // const searchTag = req.query.tags
//         // const conditions = await searchTag ? { searchTag { $regex : new RegExp(searchTag), $options: "i" }} : {};
//         // const returnQuestions = await Question.find({tags: conditions})
//         // returnQuestions ? 
//         // res.status(200).json(returnQuestions) :
//         // res.status(400).json({error: error.message})

//     }catch(err){
//         next(err)
//     }
// })
