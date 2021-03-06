const mongoose = require("../db/connection")

const answerSchema = new mongoose.Schema({
    response:{
        type: String, 
        required: true,   
    },
    votes: {
        type: Number, 
        default: 0
    },
    accepted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
    },
    {timestamps: true}
)

const Answer = mongoose.model("Answer", answerSchema)
module.exports = Answer