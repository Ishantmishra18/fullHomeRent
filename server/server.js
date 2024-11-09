const express = require('express')
const app =express()
const cors =require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const Post =require('./models/post')
const bcrypt = require('bcrypt')
const cookieParser=require('cookie-parser')
const jwt = require("jsonwebtoken")



const jwtsec='lskjf24yi2o3u429034u90irjjss'

app.use(cors({
    credentials: true,//allow accpeting cookies
    origin:'http://localhost:5173'
}))
app.use(express.json())
app.use(cookieParser())

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

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
            // Create a JWT token
            const token = jwt.sign(
                { id:user._id, username: user.username }, // Payload
                jwtsec, // Secret key
                { expiresIn: '1h' } // Expiration time
            );

            // Set the cookie with JWT token
            res.cookie('token', token, {
                httpOnly: true,  // Cookie can't be accessed by JavaScript
                secure: process.env.NODE_ENV === 'production',  // Set to true in production for HTTPS
               // 1 hour
            });

            // Send the response with user data (excluding password for security)
            return res.status(200).json({
                message: 'Login successful',
                user: {
                    username: user.username,
                    _id: user._id,
                    name:'ishant'
                }
            });
        } else {
            return res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

app.get('/profile',(req , res)=>{
    
    const {token} = req.cookies;
    if(token){
        jwt.verify(token , jwtsec , {} , async(err, user)=>{
            const userData=await User.findById(user.id)
            res.json({username:userData.username})
            
        })
    }
    else{
        
    }
})

app.get('/logout', (req, res) => {
    console.log("Logging out user");

    // Clear the 'token' cookie by setting it to an empty string and expiring it immediately
    res.cookie('token', '', {
        httpOnly: true,   // Keeps it secure in HTTP-only mode
        secure: process.env.NODE_ENV === 'production', // Ensures it's only secure in production
        maxAge: 0        // Expires the cookie immediately
    });

    res.status(200).json({ message: 'Logged out successfully' });
});


app.listen(3000)