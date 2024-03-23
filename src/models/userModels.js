import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
  firstName: {
    type: String,
    min: 3,
    max: 40,
  },
  lastName: {
    type: String,
    min: 3,
    max: 40,
  },
  role: {
    type: String,

    enum: ["Doctor", "Nurse", "client", "Admin"],
    default: "client",
  },
  phoneNumber: {
    type: String,
    min: 5,
    max: 10,
  },
  location: {
    province: {
      type: String,
    },
    district: {
      type: String,
    },
    street: {
      type: String,
    },
  },
  license: {
    type: String,
  },
  specialization: {
    type: [String],
    default: [],
  },

  ProfileImage: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status:{
    type:String,
    enum: ["approved","pending"],
  default: "pending",
}
});
export const Users = mongoose.model("User", UserScheme);
