const express = require('express')
const app =express()
const cors =require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require('bcrypt')

const jwtsec='lskjf24yi2o3u429034u90irjjss'

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/HomeRent')


app.get("/",(req,res)=>{
    res.send('hello I am the server')
})

app.post('/register' , (req, res)=>{
    const {username , password}=req.body
    console.log(`he ${username}`)
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password , salt , async (err,hash)=>{
            let user= await User.create({
                username,
                password:hash,
            })
            res.status(201).json(user)
        })
    })
})

app.post('/login', async(req, res)=>{
    const {username , password}=req.body
    
    let user = await User.findOne({username})
    if(!user) return res.json('something is wrong (user is not there)')

    bcrypt.compare(password, user.password , (err, result)=>{
        if(result){
            res.status(201).json(user)
        }
        else{
            res.json('the password is incorrect')
        }
    })
    
})



app.listen(3000)