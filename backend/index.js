const cookieParser = require('cookie-parser')
const express = require('express')
require('dotenv').config()

const app = express()

//reqular middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cookie middleware

app.use(cookieParser())

const UserRouter = require('./routes/userRoute')

app.use('/api',UserRouter)

app.get('/',(req,res) => {
    res.send("Hi from Gauriii")
})

app.listen(3000, () =>{
    console.log('server is running on port 3000');
    
})