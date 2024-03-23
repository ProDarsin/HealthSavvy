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
import { Users } from "../models/userModels.js";
import mongoose from "mongoose";


/*  register pharmacy */
export const registerPharmacy = asyncHandler(async (req, res) => {
    try {
      //upload file to cloudinary
      let licenseFiles = req.files.license;
      for (const file of licenseFiles) {
        const { path } = file;
        const result = await cloudinary.uploader.upload(path, {
          resource_type: "raw", // image or pdf
        });
        req.body.license = result.secure_url;
      }
  
      let pharmacyImageFiles = req.files.pharmacyImage;
      for (const file of pharmacyImageFiles) {
        const { path } = file;
        const result = await cloudinary.uploader.upload(path, {
          resource_type: "auto", // image or pdf
        });
        req.body.pharmacyImage = result.secure_url;
      }
  
      let profileImageUrls = [];
      let profileImageFiles = req.files.profileImage;
      for (const file of profileImageFiles) {
        const { path } = file;
        const result = await cloudinary.uploader.upload(path, {
          resource_type: "auto", // image or pdf
        });
        req.body.profileImage = result.secure_url;
        profileImageUrls.push(result);
      }
  
      /*  register pharmacy */
      const registerPharmacySchema = Joi.object({
        pharmacyName: Joi.string().min(3).max(40).required(),
        pharmacistName: Joi.string().min(3).max(40).required(),
        phoneNumber: Joi.string().min(3).max(40).required(),
        location: Joi.object({
          province: Joi.string().min(3).max(40).required(),
          district: Joi.string().min(3).max(40).required(),
          street: Joi.string().min(3).max(40).required(),
          address: Joi.string().min(3).max(40).required(),
        }).required(),
        license: Joi.string().required(),
        pharmacyImage: Joi.string().required(),
        profileImage: Joi.string().required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        }),
      });
      const { error, value } = registerPharmacySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const {
        pharmacyName,
        pharmacistName,
        phoneNumber,
        license,
        pharmacyImage,
        profileImage,
        location,
        password,
        email,
      } = value;
  
      const checkPharmacy = await Pharmacy.findOne({ pharmacyName }).select({
        pharmacyName: 1,
      });
      // check if pharmacy exist
      if (checkPharmacy) {
        return res
          .status(404)
          .json({ error: "pharmacy already exists", checkPharmacy });
      }
      
      //send email
      sendMail.setApiKey(process.env.SENDGRID_API_KEY);
      async function preparingEmail(){
        try {
          const message = {
            to: email,
            from: "ndungutsedars7@gmail.com",
            subject: ` Approved Email for ${pharmacyName}`,
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
            subject: ` Approved Email for ${pharmacyName}`,
            text: `Login credentials for ${pharmacyName}`,
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
      //hash password
  
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      // save to database
      const pharmacy = await Pharmacy.create({
        pharmacyName,
        pharmacistName,
        phoneNumber,
        location,
        password: hashPassword,
        email,
        profileImage,
        pharmacyImage,
        license,
      });
      //generate jwt token
  
      if (!pharmacy) {
        return res.status(404).json({message:"pharmacy is not created"})
      }
     return  res.status(201).json({
        pharmacyName,
        pharmacistName,
        phoneNumber,
        location,
        password,
        email,
        profileImage: req.body.profileImage,
        pharmacyImage: req.body.pharmacyImage,
        license: req.body.license,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.massage });
    }
  });