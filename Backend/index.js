import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import userRouter from "./routes/userroutes.js";
import book from './routes/book.js';
import favourite from './routes/favourite.js';
import carts from './routes/cart.js'
import Order from './routes/orderRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const url = process.env.MONGO_URI;
app.use(cors())
app.use(express.json())
app.use("/api/v1/User",userRouter)
app.use("/api/v1/User",book)
app.use("/api/v1/User", favourite)
app.use("/api/v1/User", carts)
app.use("/api/v1/User", Order)


const startServer = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB connected successfully");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error("DB connection failed", error);
  }
};

startServer();
