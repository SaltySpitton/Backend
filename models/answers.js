const mongoose = require('../db/connection')

const answerSchema = new mongoose.Schema({
    textResponse:{
        type: String, 
        required: true,   
    },
    codeResponse: {
        type: String
    },
    date: {
        type: String, 
        required: true
    },
    votes: {
        type: Number, 
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }, 
    question: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question'
    }
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer