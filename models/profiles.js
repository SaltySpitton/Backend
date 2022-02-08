const mongoose = require('../db/connection')

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    dateJoined: {
        type: String, 
        required: true
    }, 
    name: {
        type: String
    },
    nickname: {
        type: String
    }, 
    email: {
        type: String, 
    },
    github: {
        type: String
    }, 
    linkedin: {
        type: String
    }, 
    twitter : {
        type: String
    },
    about: {
        type: String
    }, 
    avatar: {
        type: String, 
    }
})
const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile