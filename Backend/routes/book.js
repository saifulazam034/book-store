import express from "express";
import User from "../models/userModel.js";
import Book from "../models/book.js";
import { authenticationToken } from "./userAuth.js";

const router = express.Router();

router.post("/add-book", authenticationToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed to perform admin work" });
    }

    const books = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    await books.save();
    res.status(200).json({ message: "Book added successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/update-book", authenticationToken, async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can update books" });
    }

    const { bookid } = req.headers;
    if (!bookid) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    
    const updatedBook = await Book.findByIdAndUpdate(
      bookid,
      {
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language,
      },
      { new: true } 
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/delete-book", authenticationToken, async(req, res)=>{
    try {
        const {bookid}=req.headers;
         await Book.findByIdAndDelete(bookid);
         res.status(200).json({message:" Deleted successfully"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"some error is occured"})
        
    }
});
router.get("/get-all-book", async(req,res)=>{
try { const books= await Book.find().sort({createdAt: -1})
return res.status(200).json({
    status:"success",
    data:books,
})
} catch (error) {
    console.log(error);
        return res.status(500).json({message:"some error is occured"})
        
    
}
});
router.get("/get-recent-book", async(req,res)=>{
try { const books= await Book.find().sort({createdAt: -1}).limit(4);
return res.status(200).json({
    status:"success",
    data:books,
})
} catch (error) {
    console.log(error);
        return res.status(500).json({message:"some error is occured"})
        
    
}
});
import mongoose from "mongoose";

router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid book id",
      });
    }
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Book not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

export default router;
