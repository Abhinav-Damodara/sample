const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3021

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/projects')
const db = mongoose.connection
db.once('open',()=>{
    console.log("MongoDB connection successful")
})

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String
})

const Users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'))
})

app.post('/post',async (req,res)=>{
    const {first_name,last_name,email} = req.body
        const user = new Users({
        first_name,
        last_name,
        email
    })
    await user.save()
    console.log(user)
    res.send("Form Submission successful")
})

app.listen(port,()=>{
    console.log(`Server started`)
})