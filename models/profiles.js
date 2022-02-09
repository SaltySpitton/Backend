const mongoose = require('../db/connection')

const profileSchema = new mongoose.Schema({
    name: {
        type: String
    },
    nickName: {
        type: String
    }, 
    about: {
        type: String
    }, 
    avatar: {
        type: String, 
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
    dateJoined: {
        type: String, 
        required: true
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
})
const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile