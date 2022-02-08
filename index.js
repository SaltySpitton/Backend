const express = require('express')
const app = express()
const port = 4200

app.use(express.json())
app.use(express.urlencoded({extended:true}))




app.listen(port, () => {
    console.log(`🎉🎊' Port is connected at ${port}`)
})