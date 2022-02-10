const express = require("express");
const router = express.Router();
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");


router.get('/:questionId', async(req,res, next) => {
    try{
        //const allAnswers = await Answer.find({questionId: req.params.questionId})
        const findQuestion = await Question.findById(req.params.questionId)
        findQuestion ?
        res.status(200).json(findQuestion.answers) :
        res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})

router.post('/:questionId', async(req,res, next) => {
    try{
        const newAnswer = await Answer.create(req.body)
        const findQuestion = await Question.findById(req.params.questionId)
        const addedAnswer = await findQuestion.answers.push(newAnswer) 
        
        addedAnswer ? 
        res.status(200).json(findQuestion) :
        res.status(400).json({error: error.message})
        
        newAnswer.save()

    }catch(err){
        next(err)
    }
})

router.get('/:questionId/:answerId', async(req,res, next) => {
    try{
        const question = await Question.findById(req.params.questionId)
        
    }catch(err){
        next(err)
    }
})


module.exports = router

//