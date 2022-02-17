const mongoose = require("../db/connection");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  about: {
    type: String,
  },
  avatar: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  twitter: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  },
  {timestamps:true}
);
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
