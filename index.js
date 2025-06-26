import bodyParser from 'body-parser';
import express from 'express';
import mongoose from "mongoose";
import Student from './models/student.js';
import Product from './models/product.js';
import User from './models/user.js';
import Item from './models/item.js';
import Order from './models/order.js'
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import itemRouter from './routes/itemRouter.js';
import orderRouter from './routes/orderRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'


dotenv.config()

const mongoUrl = process.env.MONGO_DB_URL

mongoose.connect(mongoUrl, {})

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Connected to MongoDB");
});

const app = express();

app.use(bodyParser.json());

app.use(
    (req,res,next) => {
        
        const token = req.header("Authorization") ?.replace("Bearer ", "");

        if(token != null) {
            jwt.verify(token, process.env.SECRET, (error, decoded) => {
                if(!error) {
                    req.user = decoded;
                }
            }
        )}
        next()
    }
)

app.use("/students", studentRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use("/orders", orderRouter);

app.listen(
    5000,
    () => {
        console.log("Server is running on port 5000");
    }
);