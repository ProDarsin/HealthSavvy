import asyncHandler from "express-async-handler";
import { Pharmacy } from "../models/pharmacy.js";
import { Hospital } from "../models/hospital.js";
import cloudinary from "../utils/cloudinary.js";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import bcrypt from "bcryptjs";
import Joi from "joi";
import sendMail from "@sendgrid/mail";
import mongoose from "mongoose";




/*  register hospital */
export const registerHospital = asyncHandler(async (req, res) => {
    try {
      //upload file to cloudinary
      let licenseFiles = req.files.license;
      for (const file of licenseFiles) {
        const { path } = file;
        const result = await cloudinary.uploader.upload(path);
        req.body.license = result.secure_url;
      }
  
      let hospitalImageFiles = req.files.hospitalImage;
      for (const file of hospitalImageFiles) {
        const { path } = file;
        const result = await cloudinary.uploader.upload(path);
        req.body.hospitalImage = result.secure_url;
      }
      console.log(req.body.specialization);
      /*  register hospital */
      const hospitalSchema = Joi.object({
        hospitalName: Joi.string().min(1).max(30).required(),
        phoneNumber: Joi.string().required(),
        location: Joi.object({
          province: Joi.string().min(3).max(40).required(),
          district: Joi.string().min(3).max(40).required(),
          street: Joi.string().min(3).max(40).required(),
          address: Joi.string().min(3).max(40).required(),
        }).required(),
        specialization: Joi.array()
          .items(Joi.string().min(3).max(30))
          .min(1)
          .max(5)
          .unique()
          .required(),
        hospitalImage: Joi.string().required(),
        license: Joi.string().required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
      });
      const { error, value } = hospitalSchema.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message.red.underline);
      }
      const {
        hospitalName,
        phoneNumber,
        location,
        specialization,
        license,
        password,
        hospitalImage,
        email,
        address,
      } = value;
  
 
  
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
            subject: ` Approved Email for ${hospitalName}`,
            text: `Login credentials for ${hospitalName}`,
            html: `<p style="font-size:16px;"> your log  credentials  is  Email:${email} Password:${password}</p> `,
          };
  
          await sendMail.send(message);
          console.log("email send successfull");
        } catch (error) {
          console.log("email not send");
          console.log(error);
        }
      }
    
      // set  when hospital will get email
      const days=3;
      const millisecondsInDay = 86400000
      const timeout= days* millisecondsInDay

      setTimeout(sendEmail,timeout)
      //check if hospital exist
      const checkHospital = await Hospital.findOne({ hospitalName }).select({
        hospitalName: 1,
      });
      if (checkHospital) {
        return res
          .status(404)
          .json({ error: "hospital already exists", checkHospital });
      }
  
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      const hospital = await Hospital.create({
        hospitalName,
        phoneNumber,
        location,
        specialization,
        password: hashPassword,
        email,
        license,
        hospitalImage,
        address
      });
  
      //generate jwt token
      const token = generateToken(hospital._id);
      if (!hospital) {
        return rea.status(404).json({message:'hospital not create'})
      };
     return  res.status(201).json({
        hospitalName,
        phoneNumber,
        location,
        specialization,
        password,
        license: req.body.license,
        hospitalImage: req.body.hospitalImage,
        email,
        address
      })
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.massage });
    }
  });