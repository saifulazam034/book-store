import express from "express";
import User from "../models/userModel.js";
import { authenticationToken } from "./userAuth.js";

const router = express.Router();
router.put("/favourite",authenticationToken, async(req, res)=>{
    try {
        const {bookid, id}= req.headers;
        const userDate = await User.findById(id)
        const favouritebook = userDate.favourites.includes(bookid);
        if(favouritebook){
            return res.status(200).json({message:"book is already your favouite"})
        }else{
            await User.findByIdAndUpdate(id, {$push:{favourites:bookid}});
            res.status(200).json({message:"add your favorite"})
        }
    } catch (error) {
        res.status(500).json({message:" internal server error"})
        
    }
});
router.put("/remove-favourite",authenticationToken, async(req, res)=>{
    try {
        const {bookid, id}= req.headers;
        const userDate = await User.findById(id)
        const favouritebook = userDate.favourites.includes(bookid);
        if(favouritebook){
            await User.findByIdAndUpdate(id, {$pull:{favourites:bookid}});
            res.status(200).json({message:"remove your favorite"})
        }
    } catch (error) {
        res.status(500).json({message:" internal server error"})
        
    }
})
router.get("/get-favourite", authenticationToken, async(req, res)=>{
    try {
        const {id} = req.headers;
        const userDate = await User.findById(id).populate("favourites");
        const favouritesDate =userDate.favourites;
        return res.status(200).json({
            status: "success",
            data:favouritesDate,
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"some thing is wrong"})
        
    }
})

export default router;