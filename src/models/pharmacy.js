
import mongoose from "mongoose";

const pharmacySchema= new mongoose.Schema({
    pharmacyName:{
        type :String,
        required:[true,'please add your  pharmacy']
    },
    pharmacistName:{
        type :String,
 
        required:[true,'please add your  pharmacist']
    },
    phoneNumber:{
        type:String,
   
        required:[true,'please add your phone number']
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
    license:{
        type:String,
        required:[true,'please add your license']
    },
    profileImage:{
    type:String,
   required: [true,'please add your profile image']
   },
   pharmacyImage:{
    type:String,
    required: [true,'please add your profile image']
   },
email:{
    type:String,
    min:3,
    max:40,
    required:[true,'please add pharmacy email'],

},
password:{
    type:String,

    required:[true,'please add pharmacy password']
},
status:{
    type:String,
    enum: ["approved","pending"],
  default: "pending",
}
},{
    timestamps:true
})
    
export const Pharmacy=mongoose.model("Pharmacy",pharmacySchema)
