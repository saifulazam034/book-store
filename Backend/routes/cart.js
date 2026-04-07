import express from "express";
import Book from "../models/book.js";
import User from "../models/userModel.js";
import { authenticationToken } from "./userAuth.js";

const router = express.Router();
router.put("/put-cart", authenticationToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;

    if (!id || !bookid) {
      return res.status(400).json({ message: "id or bookid missing" });
    }

    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const cartdata = userData.cart.some(
  (item) => item.toString() === bookid
);
console.log("BOOK ID:", bookid);
console.log("CART ITEMS:", userData.cart);


    if (cartdata) {
      return res.status(200).json({
        status: "success",
        message: "book already in cart",
      });
    }

    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });

    return res.status(200).json({
      status: "success",
      message: "added into cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
});


router.put(" /:bookid", authenticationToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const id = req.user.id; 

    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartHasBook = userData.cart.some(
      (item) => item.toString() === bookid
    );

    if (!cartHasBook) {
      return res.status(400).json({ message: "Book not in cart" });
    }

    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });

    return res.status(200).json({ message: "Book removed from cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/get-cart", authenticationToken, async (req, res) => {
  try {
    const userId = req.user.id; // token se id

    const userData = await User.findById(userId).populate("cart");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Reverse the cart array
    const cartData = [...userData.cart].reverse();

    return res.status(200).json({
      status: "success",
      data: cartData,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;