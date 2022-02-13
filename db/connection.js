const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://SaltySpitoon:SpongeAtlas@cluster0.ng5bv.mongodb.net/devHelp?retryWrites=true&w=majority"

mongoose.connect(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(instance => console.log(instance.connections[0].name))
.catch(err => console.error(err))

module.exports = mongoose