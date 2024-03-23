import mongoose from "mongoose";

const paymentsSchame= new mongoose.Schema({
    transaction:{
        type:Array
    }
})

export const Transaction= mongoose.model('Payments',paymentsSchame)