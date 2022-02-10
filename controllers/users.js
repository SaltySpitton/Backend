const express = require("express");
const router = express.Router();
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");

router.get('/', async(req,res, next) => {
    try{
        const users = await User.find({})
        users ?
        res.status(200).json(users) :
        res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})



router.post('/', async(req,res, next) => {
    try{
        const newUser = await User.create(req.body)
        newnewUser ? 
        res.status(200).json(newUser) :
        res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})

router.get('/:userId', async(req,res,next) => {
    try{
        // const findQuestions = await Question.find({user: req.params.userId})
        const findAllAnswers = await findQuestions.map((question) => {
            return Answer.find({questionId : question._id})
        })
        // findAllAnswers ? 
        // console.log(findAllAnswers) :
        // console.log('unable to find')
        const findUser = await User.findById(req.params.userId)
        findUser ?
        res.status(200).json(findUser) :
        res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})

router.delete('/:userId', async(req,res,next) => {
    try{
        //will put deleteComments here as well
        // const deleteQuestions = await Question.deleteMany({user: req.params.userId})
        
        // const questionAnswers = await Answer.deleteMany()

        // const userAnswers = await Answer.deleteMany({user : req.params.userId})
        // const deleteAnswers = await Answer.deleteMany({questionId: req.params.questionId})
        
        // const userToDelete = await User.findByIdAndDelete(req.params.userId)
        // deleteAnswers && deleteQuestion ? 
        // res.status(200).json() :
        // res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})

router.put('/:userId', async(req,res,next) => {
    try{
        const editUser = await User.findByIdAndUpdate(req.params.userId, req.body)
        editUser ?
        res.status(200).json(editUser) :
        res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})

//user get questions

router.get('/:userId/questions', async(req,res, next) => {
    try{
        const users = await User.find({})
        users ?
        res.status(200).json(users) :
        res.status(400).json({error: error.message})
    }catch(err){
        next(err)
    }
})






module.exports = router
