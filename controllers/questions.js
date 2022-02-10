const express = require("express");
const router = express.Router();
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
// const req = require("express/lib/request");

router.get('/', async(req,res,next) => {
    try{
        //req.user.id
        let allQuestions;
        // (req.params ? )
        allQuestions = await Question.find({})
        allQuestions ? 
        res.status(200).json(allQuestions) :
        res.status(400).json({error: error.message})
    }catch(err){
       next(err)
    }
})

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

router.get('/:questionId', async(req,res,next) => {
    try{
        const question = await Question.find(req.params.questionId)
        question ?
        res.status(200).json(question) :
        res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})

router.delete('/:questionId', async(req,res,next) => {
    try{
        //m
        const deleteQuestion = await Question.findByIdAndDelete(req.params.questionId)
        //map through question's - answer array and find each answers Comments and delete
        // to delete comments to answers & query for comments that linked to Q itself

        deleteQuestion ? 
        res.status(200).json() :
        res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})

router.put('/:questionId', async(req,res,next) => {
    try{
        const editQuestion = await Question.findByIdAndUpdate(req.params.questionId, req.body)
        editQuestion ?
        res.status(200).json(newQuestion) :
        res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})

router.get('/:userId')


module.exports = router;
