
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const FormRoutes= require("./Routes/FormsRoutes")
const ResponseRoute= require("./Routes/ResponseRoute")

app.use(cors())
app.use(express.json())

app.use('/form',FormRoutes)
app.use('/response',ResponseRoute)

app.use('/',(req,res)=>{
    res.send('api for bolo forms')
})




app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("our database is connected");
    } catch (error) {
        
    }
   
})