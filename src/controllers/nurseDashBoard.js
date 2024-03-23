import { Users } from "../models/userModels.js";
import { Booking } from "../models/booking.js";
import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Joi from "joi";
import bcrypt from "bcryptjs";

export const login = asyncHandler(async (req, res) => {
  try {
    const nurseSchema = Joi.object({
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });

    const { error, value } = nurseSchema.validate(req.body);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { password, email } = value;

    if (!email) {
      res.status(400).send(`wrong email ${email}`);
    }

    //check doctor
    const nurse = await Users.findOne({ email });
    if (!nurse) {
      res.status(400).json({ message: "no nurse with such email in system " });
    }
    const token = generateToken(nurse._id);
    //check password
    const checkPassword = await bcrypt.compare(password, nurse.password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: "Password does not match with the first one" });
    }

    res.status(200).json({ nurse, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const nurseSchema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  const { error, value } = nurseSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = value;

  //check user by email

  const doctor = await Users.findOne({ email });
  if (!pharmacy) {
    return res.status(400).json({ message: "no such pharmacy in system " });
  }
  //salt
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newP = await Users.findOneAndUpdate(
    { email: email },
    { password: hashPassword },
    { returnOriginal: false }
  );
  res.status(200).json(newP);
});

export const readMessage = asyncHandler(async (req, res) => {
  try {
    const message = await Booking.find({ doctorOrNurse: req.user.id })
      .populate("client", "firstName lastName -_id role:' client'")
      .select("message phoneNumber email");
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

const generateToken = (id) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
