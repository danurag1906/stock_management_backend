import express from "express"
// import {PORT,MONGO_URL} from './config.js'
import mongoose from "mongoose";
import { Product } from "./models/productModel.js";
import productRoute from './routes/productRoute.js'
import dotenv from 'dotenv'
import cors from 'cors';
dotenv.config()

const app=express()

const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL
const ORIGIN_URL=process.env.ORIGIN_URL
const BASE_URL=process.env.BASE_URL

app.use(cors({
    origin:[ORIGIN_URL,BASE_URL],
    allowedHeaders:['Content-Type']
}))

app.use(express.json())

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(200).json("welcome")
})

//tell express that for each request  use this middleware.
app.use('/',productRoute)

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("connected to db")
    app.listen(PORT,()=>{
        console.log(`App is listing to port : ${PORT}`);
    })
}).catch((error)=>{
    console.log(error);
})