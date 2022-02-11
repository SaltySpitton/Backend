const express = require("express");
const router = express.Router();
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
// const req = require("express/lib/request");

//POTENTIALLY WILL COME BACK TO ADD BACKEND CHECKS & HARD STOPS IF DATA IS NOT PRESENT : like if no title (I know the schema stops that but maybe something extra for another thing?)/ etc

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

//post a new question - linked to User Profile : LEAVING FOR UPDATES
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

// - Get All of Current Users Questions
// - Get all Questions Based On Query Of tags(sylvie is working on regexp function (can either be a query or param here - will check in can leave for now)
// - pagination of returned data in the '/' get all index route 
//CASCADING DELETION OF QUESTIONS -> answers Once we delete the users , current if you delete a question it deletes all answers