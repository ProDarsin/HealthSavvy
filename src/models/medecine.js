import mongoose from "mongoose";

const medicineSchema= new mongoose.Schema({
    pharmacy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Pharmacy'
    },
    medicineName:{
        type: String,
        required:[true, 'please add medicine name']
    },
    medicineId:{
        type:String,
        required:[true, 'please add medicine Id']
    },
    quantity:{
        type:String,
        required:[true, 'please add quantity']
    },
    description:{
        type:String,
        required:[true, 'please add description']
    },
    disease:{
        type:[String],
        required:[true, 'please add disease']
    },
    categories:{
        type:String,
        enum:['GSLs','P','POM','CD']
    },
    medicineImage:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }

})

export const Medicine=mongoose.model('Medicine',medicineSchema)