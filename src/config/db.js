import mongoose from "mongoose";
import asyncHandler from 'express-async-handler'

 export const connectDb= asyncHandler(async()=>{
    try {
        mongoose.set("strictQuery",true)
        const con= await mongoose.connect(process.env.MONG_URL)
        console.log(`mongodb connected ${con.connection.host}`.green.underline)

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
 })