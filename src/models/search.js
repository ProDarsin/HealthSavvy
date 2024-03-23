import mongoose from "mongoose";

const searchSchema= new mongoose.Schema({

    hospital:{
        type: String,
        required:true,
        ref:'Hospital'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Users"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

export  const Search= mongoose.model("Search",searchSchema)