import mongoose from 'mongoose'

const contactSchema= new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now
        }
    }
)

export const Contact= mongoose.model('Contact',contactSchema)