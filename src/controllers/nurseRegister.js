import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import bcrypt from "bcryptjs";
import Joi from "joi";
import sendMail from "@sendgrid/mail";
import { Users } from "../models/userModels.js";
import mongoose from "mongoose";




//register nurse

export const registerNurse = asyncHandler(async (req, res) => {
    try {
      // upload file and image
  
      const licenseFiles = req.files.license;
      for (const file of licenseFiles) {
        const { path } = file;
        const result = await cloudinary.uploader.upload(path);
        req.body.license = result.secure_url;
      }
      // upload file and image
  
      const ProfileImageFiles = req.files.ProfileImage;
      for (const file of ProfileImageFiles) {
        const { path } = file;
        const result = await cloudinary.uploader.upload(path);
        req.body.ProfileImage = result.secure_url;
      }
  
      const nurseSchema = Joi.object({
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(20).required(),
        role: Joi.string().min(3).max(20).required(),
        phoneNumber: Joi.string().min(3).max(20).required(),
        location: Joi.object({
          province: Joi.string().min(3).max(20).required(),
          district: Joi.string().min(3).max(20).required(),
          street: Joi.string().min(3).max(20).required(),
        }),
        specialization: Joi.array().required(),
        license: Joi.string().required(),
        ProfileImage: Joi.string().required(),
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
      const {
        firstName,
        lastName,
        role,
        phoneNumber,
        location,
        specialization,
        ProfileImage,
        license,
        password,
        email,
      } = value;
  
      //check if doctor
  
      const checkDoctor = await Users.findOne({ role: "Nurse", email }).select({
        role: 1,
        email: 1,
      });
  
      if (checkDoctor) {
        return res
          .status(400)
          .json({
            message: `nurse you wanna register is already in system`,
            checkDoctor,
          });
      }
      
      
      sendMail.setApiKey(process.env.SENDGRID_API_KEY);
      async function preparingEmail(){
        try {
          const message = {
            to: email,
            from: "ndungutsedars7@gmail.com",
            subject: ` Approved Email for ${hospitalName}`,
            text: `thanx for applying in  HeathSavvy `,
            html: `<p style="font-size:16px;"> wait for being approved  we will send you email after check your license </p> `,
          };
  
          await sendMail.send(message);
          console.log("email send successfull");
        } catch (error) {
          console.log("email not send");
          console.log(error);
        }
       }
       preparingEmail()
      async function sendEmail() {
        try {
          const message = {
            to: email,
            from: "ndungutsedars7@gmail.com",
            subject: ` Approved Email for  ${firstName}`,
            text: `Login credentials for  ${firstName}`,
            html: `<p style="font-size:16px;"> your log  credentials  is  Email:${email} Password:${password}</p> `,
          };
  
          await sendMail.send(message);
          console.log("email send successfull");
        } catch (error) {
          console.log("email not send");
          console.log(error);
        }
      }
      //sendEmail()
         // set  when hospital will get email
         const days=3;
         const millisecondsInDay = 86400000
         const timeout= days* millisecondsInDay
   
         setTimeout(sendEmail,timeout)
      //salt
      const salt = await bcrypt.genSalt(10);
      //hash password
      const hashPassword = await bcrypt.hash(password, salt);
      const Nurse = await Users.create({
        firstName,
        lastName,
        role,
        phoneNumber,
        location,
        specialization,
        ProfileImage,
        license,
        password: hashPassword,
        email,
      });
  
      const token = generateToken(doctor._id);
      if (!nurse) {
        return res.status(401).json({message:"nurse is not created"})
      }
      return res.status(201).json( nurse );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  });