import mongoose from "mongoose";

const hospitalSchema= new mongoose.Schema({
    hospitalName:{
        type: String,
        minlength:[4, 'Username cannot  less than 30 characters'],
        maxlength: [30, 'Username cannot be more than 30 characters'],
        required:[true,'please add your hospital name']
    },
    specialization:{
        type:Array,
        default:[]
    },
    phoneNumber:{
        type:String,
        required:[true,'please ad you phone number ']
    },
    license:{
        type:String,
        required:[true,'please add your license']
    },
    date:{
        type:Date,
        default:Date.now
    },
    email:{
        type:String,
        min:4,
        max:20,
        required:[true,'please add your email']
    },
    password:{
        type:String,
        min: [5, 'Password must be at least 5 characters long'],
        max: [30, 'Password cannot be more than 30 characters'],
        required:[true,'please add your password']
    },
    location:{
        province:{
            type:String,
            required:[true,'please dd province']
        },
        district:{
            type:String,
            required:[true,'please add district']
        },
        street:{
            type:String,
            required:[true,'please add street']
        },
        address:{
            type:String,
            required:[true,'please add address']
        }
    },
    hospitalImage:{
        type:String,
        required:[true,'please add your hospital Image']
    },
    status:{
        type:String,
        enum: ["approved","pending"],
      default: "pending",
    }
    

})

export const Hospital= mongoose.model('Hospital',hospitalSchema)