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

/*  register admin */

export const registerAdmin = asyncHandler(async (req, res) => {
  try {
    //upload admin image
    const result = await cloudinary.uploader.upload(req.file.path);
    const adminSchema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      role: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });
    const { error, value } = adminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { firstName, lastName, role, phoneNumber, password, email } = value;

    // salt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const admin = await Users.create({
      firstName,
      lastName,
      role,
      email,
      phoneNumber,
      password: hashPassword,
      ProfileImage: result.secure_url,
    });

    return res.status(201).json(admin);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*  read admin */
export const readAdmin = asyncHandler(async (req, res) => {
  try {
    const admin = await Users.find({ role: "Admin" }).select("-specialization");
    return res.status(201).json(admin);
  } catch (error) {
    return res.status(500).json({ error: error.massage });
  }
});

export const AdminLogin = asyncHandler(async (req, res) => {
  try {
    const adminSchema = Joi.object({
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });

    const { error, value } = adminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { password, email } = value;

    //checking email
    const admin = await Users.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "no such admin in system" });
    }
    //compare password
    const checkPassword = await bcrypt.compare(password, admin.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "password does not much" });
    }
    const token = generateToken(admin._id);
    return res.status(201).json({ admin, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
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

          // set when hospital will get email
    const days=3;
    const millisecondsInDay = 86400000
    const timeout= days* millisecondsInDay
    //hash password
    setTimeout(sendEmail,timeout)
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

/*  get pharmacy */

export const readPharmacy = asyncHandler(async (req, res) => {
  try {
    const pharmacy = await Pharmacy.find({});
    function isEmpty(pharmacy) {
      return pharmacy.length === 0;
    }
    if (isEmpty(pharmacy)) {
      res.status(200).json({ message: "no pharmacy in system" });
    } else {
      res.status(200).json(pharmacy);
    }
    isEmpty(pharmacy);
    res.status(200).json(pharmacy);
  } catch (err) {
    res.status(500).json({ error: err.massage });
  }
});

/*  remove pharmacy */
export const deletePharmacy = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacy = await Pharmacy.findById(id);
    if (!pharmacy) {
      res.status(404).send("no such pharmacy in the system");
    }

    const removePharmacy = await Pharmacy.findByIdAndDelete(id);

    res.status(200).json({ message: "pharmacy removed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

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

          // set when hospital will get email
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
      return res.status(404).json({message:'hospital not create'})
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

/*  get hospital */

export const readHospital = asyncHandler(async (req, res) => {
  try {
    const hospitals = await Hospital.find({});
    function isEmpty(hospitals) {
      return hospitals.length === 0;
    }
    if (isEmpty(hospitals)) {
      res.status(200).json({ message: "no hospital in system" });
    } else {
      res.status(200).json(hospitals);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.massage });
  }
});

/*remove hosital*/

export const deleteHospital = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      res.status(404).send("no such pharmacy in the system");
    }

    const removeHospital = await Hospital.findByIdAndDelete(id);

    res.status(200).json({ message: "hospital removed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


/*register doctor*/
export const registerDoctor = asyncHandler(async (req, res) => {
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

    const doctorSchema = Joi.object({
      firstName: Joi.string().min(3).max(20).required(),
      lastName: Joi.string().min(3).max(20).required(),
      role: Joi.string().min(3).max(20).required(),
      phoneNumber: Joi.string().min(3).max(20).required(),
      location: Joi.object({
        province: Joi.string().min(3).max(20).required(),
        district: Joi.string().min(3).max(20).required(),
        street: Joi.string().min(3).max(20).required(),
      }),
      specialization: Joi.array()
        .items(Joi.string().min(3).max(30))
        .min(1)
        .max(5)
        .unique()
        .required(),
      license: Joi.string().required(),
      ProfileImage: Joi.string().required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      description: Joi.string().required(),
    });

    const { error, value } = doctorSchema.validate(req.body);

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
      description,
    } = value;

    //check if doctor

    const checkDoctor = await Users.findOne({ role: "Doctor", email }).select({
      role: 1,
      email: 1,
    });

    if (checkDoctor) {
      return res
        .status(400)
        .json({
          message: `Doctor you wanna register is already in system`,
          checkDoctor,
        });
    }

    async function sendEmail() {
      sendMail.setApiKey(process.env.SENDGRID_API_KEY);
      try {
        const message = {
          to: email,
          from: "ndungutsedars7@gmail.com",
          subject: ` Approved Email for Dr ${firstName}`,
          text: `Login credentials for Dr ${firstName}`,
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
    //salt
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashPassword = await bcrypt.hash(password, salt);
    const doctor = await Users.create({
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
      description,
    });

    if (!doctor) {
     return res.status(401).json({message:"doctor is not created"})
    }
    return res.status(201).json(doctor);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});
/*read  doctor*/
export const readDoctor = asyncHandler(async (req, res) => {
  try {
    //get all doctor
    const doctor = await Users.find({ role: "Doctor" });
    res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

/*delete  doctor*/

export const deleteDoctor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "no such doctor in system" });
    }
    const Deletedoctor = await Users.findByIdAndDelete(id);
    res.status(200).json({ message: "doctor is removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
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

    async function sendEmail() {
      sendMail.setApiKey(process.env.SENDGRID_API_KEY);
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
    //salt
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashPassword = await bcrypt.hash(password, salt);
    const nurse = await Users.create({
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

    const token = generateToken(nurse._id);
    if (!nurse) {
      return res.status(401).json({message:"nurse is not created"})
    }
    return res.status(201).json( nurse );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export const readNurse = asyncHandler(async (req, res) => {
  try {
    //get all doctor
    const nurse = await Users.find({ role: "Nurse" });
    res.status(200).json(nurse);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

/*delete  nurse*/

export const deleteNurse = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "no such doctor in system" });
    }
    const DeleteNurse = await Users.findByIdAndDelete(id);
    res.status(200).json({ message: "nurse is removed" });
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
