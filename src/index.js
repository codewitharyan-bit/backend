import 'dotenv/config';
import mongoose from "mongoose";
import { DB_NAME } from "./constant.js"; 
import {app} from './app.js' 
import connectDB from "./db/index.js";






connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})





// import express from "express";
// const app = express()
// (async()=>{
//     try{
//       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//       app.on("error",()=>{
//         console.log("ERROR")
//         throw error
//       });
//       app.listen(process.env.PORT,()=>{
//         console.log(`App is listening on ${process.env.PORT}`)
//       })
//     }
//     catch{
//         console.error("ERROR :",error);
//     }
// })()