import { Booking } from "../models/booking.js";
import asyncHandler from "express-async-handler";
import { Users } from "../models/userModels.js";
import Joi from "joi";
import mongoose from "mongoose";
export const bookingDoctor = asyncHandler(async (req, res) => {
  try {
    console.log("test");
    const bookingSchema = Joi.object({
      phoneNumber: Joi.string().min(3).max(20).required(),
      message: Joi.string().min(3).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });

    const { error, value } = bookingSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { phoneNumber, message, email } = value;
    const booking = await Booking.create({
      phoneNumber,
      message,
      email,
      client: req.client._id,
      doctorOrNurse: req.params.doctorId,
    });
    return res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export const bookingNurse = asyncHandler(async (req, res) => {
  try {
    console.log("test");
    const { nurseId } = req.params;
    const user = await Users.findById(nurseId).select(
      "firstName lastName role"
    );
    if (!user) {
      return res.status(400).json({ message: " you are not a nurse" });
    }

    const bookingSchema = Joi.object({
      phoneNumber: Joi.string().min(3).max(20).required(),
      message: Joi.string().required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });

    const { error, value } = bookingSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { phoneNumber, message, email } = value;
    const booking = await Booking.create({
      phoneNumber,
      message,
      email,
      client: req.client._id,
      doctorOrNurse: req.params.nurseId,
    });
    return res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});
