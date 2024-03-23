import { Users } from "../models/userModels.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Joi from "joi";
import Jwt from "jsonwebtoken";
export const registerClient = asyncHandler(async (req, res) => {
  try {
    const clientSchema = Joi.object({
      firstName: Joi.string().min(3).max(20).required(),
      lastName: Joi.string().min(3).max(20).required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      email: Joi.string().email({ minDomainSegments: 2 }),
    });
    const { error, value } = clientSchema.validate(req.body);
    if (error) {
      {
        return res.status(400).json({ error: error.details[0].message });
      }
    }
    const { firstName, lastName, password, email } = value;
    //check cleint exist
    const checkClient = await Users.findOne({ email, role: "client" }).select(
      " firstName lastName email role "
    );
    if (checkClient) {
      return res.status(400).json({
        message: " you are already register in system try to log in",
        checkClient,
      });
    }

    //salt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const client = await Users.create({
      firstName,
      lastName,
      password: hashPassword,
      email,
    });
    res.status(201).json(client);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export const getclient = asyncHandler(async (req, res) => {
  try {
    const client = await Users.find({ role: "client" }).select(
      "-specialization"
    );

    res.status(200).json(client);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const clientSchema = Joi.object({
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });
    const { error, value } = clientSchema.validate(req.body);
    if (error) {
      {
        return res.status(400).json({ error: error.details[0].message });
      }
    }
    const { password, email } = value;
    console.log(value);
    //check cleint exist
    const client = await Users.findOne({ email, role: "client" });
    if (!client) {
      return res.status(400).json({
        message: " no such email in system try to use collect email to login ",
      });
    }
    const token = generateToken(client._id);
    //check password
    const checkPassword = await bcrypt.compare(password, client.password);
    console.log(checkPassword);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: "please password does  not mach " });
    }
    res.status(200).json({
      id: client._id,
      firstName: client.firstName,
      lastName: client.lastName,
      role:client.role,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
const generateToken = (id) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
