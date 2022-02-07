const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/devHelp"


mongoose.connect(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(instance => console.log(instance.connections[0].name))
.catch(err => console.error(err))

module.exports = mongoose