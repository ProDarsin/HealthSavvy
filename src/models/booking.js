import mongoose from "mongoose";

const bookingScheme = new mongoose.Schema({
  doctorOrNurse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  phoneNumber: {
    type: String,
    min: 5,
    max: 10,
    required: [true, "please add your phone number"],
  },

  message: {
    type: String,
    required: [true, "please add your message "],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
export const Booking = mongoose.model("Booking", bookingScheme);
