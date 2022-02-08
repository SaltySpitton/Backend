const mongoose = require('../db/connection')

const questionSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    }, 
    body: {
        type: String, 
        required: true
    }, 
    votes: {
        type: Number, 
        default: 0
    },
    tags: {
        type: String,
        enum: [
          'html',
          'css',
          'java',
          'javascript',
          'node.js',
          'mongoose',
          'mongodb',
          'react',
          'jquery',
          'python',
          'json',
          'django',
          'ejs',
          'other',
        ],
        require: true,
      },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }

})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question


