import express from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from  'jsonwebtoken'
import { authenticationToken } from "./userAuth.js";
const router = express.Router();  

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if ( username.length < 3) {
      return res.status(400).json({
        message: "Username must be greater than 3",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if ( password.length  < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }
const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      email,
      password:hashpassword,
      address,
    });

    await newUser.save();

    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/login", async (req, res) =>{
   try {
     const {username, password}= req.body;
    const exisitingUser = await User.findOne({username});
    if(!exisitingUser){
        res.status(400).json({message:"invalid user Name"})
    }
    await bcrypt.compare(password, exisitingUser.password,(err, data)=>{
        if (data) {
  const token = jwt.sign(
    {
      id: exisitingUser._id,   
      name: exisitingUser.username,
      role: exisitingUser.role
    },
    "bookStore123",
    {
      expiresIn: "30d",
    }
  );
            res.status(200).json({id: exisitingUser._id, role:exisitingUser.role, token: token,
            })
          }else{
            res.status(400).json({message:"invalid password"})
        }
    })
    
   } catch (error) {
    res.status(500).json({error:"internal server is error"})
    
    
   }
    
});
router.get("/get-user", authenticationToken, async (req, res) => {
  try {
    const id = req.user.id; 

    const data = await User.findById(id).select("-password");

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/update-address" ,authenticationToken, async (req,res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    res.status(200).json({message:"Address updated"})

    
  } catch (error) {
     res.status(500).json({error:"internal server is error"})

    
  }
  
})

export default router;
