const express = require('express')
const app = express()
const port = 4200

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req,res) => {
    console.log('hello from devs to you')
})


app.listen(port, () => {
    console.log(`🎉🎊' Port is connected at ${port}`)
})