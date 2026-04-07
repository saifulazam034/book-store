import express from "express";
import User from "../models/userModel.js";
import Order from "../models/orders.js";
import { authenticationToken } from "./userAuth.js";

const router = express.Router();

router.post("/place-order", authenticationToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { order } = req.body;

    if (!order || order.length === 0) {
      return res.status(400).json({ message: "Order is empty" });
    }

    const orderIds = [];

    for (const orderBook of order) {
      const newOrder = new Order({
        user: userId,
        book: orderBook._id,
      });

      const savedOrder = await newOrder.save();
      orderIds.push(savedOrder._id);
    }

    // push all orders at once
    await User.findByIdAndUpdate(userId, {
      $push: { orders: { $each: orderIds } },
      $pull: { cart: { $in: order.map(b => b._id) } },
    });

    return res.status(200).json({
      status: "success",
      message: "order placed successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});
router.get("/get-order",authenticationToken, async(req, res)=>{
    try {
        const {id}= req.headers;
        const userData= await User.findById(id).populate({
            path: orders,
            populate:{path:"Book"},
            
        })
        const orderData = userData.orders.reverse();
        return res.json({
            status:"success",
            data:orderData
        })
    } catch (error) {
        console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
        
    }
});
router.get("/get-all-order",authenticationToken,async(req, res)=>{
    try {
        const userData = await Order.find()
        .populate({
            path:"book",

        })
        .populate({
            path:"user"
        })
        .sort({createdAt: -1});
        return res.json({
            status:"success",
            data: userData
        })
        
    } catch (error) {
        console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
        
    }
});
router.put("/update-status/:id",authenticationToken,async(req, res)=>{
    try {
       const {id}= req.params;
       await Order.findByIdAndUpdate(id, {status:req.body.status});
        return res.json({
            status:"success",
            message:"successfully updated status"
        })
        
    } catch (error) {
        console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
        
    }
})

export default router;
