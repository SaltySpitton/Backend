require('dotenv').config()
const express = require('express')
const app = express()
const port = 4200

// app.set('port', process.env.PORT || 3000)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(port, () => {
    console.log(`🎉🎊' Port is connected at ${port}`)
})