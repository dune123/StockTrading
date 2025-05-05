const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const User=require('../models/User')

const registerUser=async(req,res,next)=>{
    try {
        const {username,email,password}=req.body

        if(!username||!email||!password){
            return res.status(400).json({message:"Invalid credentials"})
        }

        if(email.includes('@')||password.length<6){
            return res.status(400).json({message:"Invalid credentials"})
        }


        const findUser=await User.findOne({email})

        if(findUser){
            return res.status(409).json({message:"User already exist select a different email"})
        }
        
        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })

        await newUser.save()

        return res.status(201).json({message:"User created successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

const loginUser=async(req,res,next)=>{
    try {
        const {email,password}=req.body

        if(!email||!password){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const findUser=await User.findOne({email})

        if(!findUser){
            return res.status().json({message:"User not found please login first"})
        }

        const token=jwt.sign({
            _id:findUser._id,
            username:findUser.username
        },process.env.JWT_SECRET_KEY,{expiresIn:"1d"})

        return res.status(200).json({message:"Logged in successfully",token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}

module.exports={
    registerUser,
    loginUser
}