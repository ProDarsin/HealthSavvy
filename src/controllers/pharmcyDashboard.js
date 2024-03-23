import asyncHandler from "express-async-handler";
import Joi from "joi";
import { Pharmacy } from "../models/pharmacy.js";
import { Medicine } from "../models/medecine.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";

export const login = asyncHandler(async (req, res) => {
  try {
    const pharmacySchema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    const { error, value } = pharmacySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = value;

    //check pharmacy by email
    const pharmacy = await Pharmacy.findOne({ email });
    if (!pharmacy) {
      return res.status(400).json({ message: "no such pharmacy in system" });
    }
    const token = generateToken(pharmacy._id);
    //check pharmacy password

    const checkPassword = await bcrypt.compare(password, pharmacy.password);

    if (!checkPassword) {
      return res
        .status(400)
        .json({ message: "Password does not match with the first one" });
    }

    res.status(200).json({
      id: pharmacy._id,
      pharmacyName: pharmacy.pharmacyName,
      email: pharmacy.email,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const pharmacySchema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  const { error, value } = pharmacySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = value;

  //check user by email

  const pharmacy = await Pharmacy.findOne({ email });
  if (!pharmacy) {
    return res.status(400).json({ message: "no such pharmacy in system " });
  }
  //salt
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newP = await Pharmacy.findOneAndUpdate(
    { email: email },
    { password: hashPassword },
    { returnOriginal: false }
  );
  res.status(200).json(newP);
});
export const addMedicine = asyncHandler(async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      res.status(400).json({ error: "File is missing or invalid" });
      return;
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const medIcineSchema = Joi.object({
      medicineName: Joi.string().min(3).max(40).required(),
      medicineId: Joi.string().min(3).max(40).required(),
      quantity: Joi.string().min(3).max(40).required(),
      description: Joi.string().min(3).max(40),
      disease: Joi.array()
      .items(Joi.string().min(3).max(30))
      .min(1)
      .max(5)
      .unique()
      .required(),
      categories: Joi.string().required(),
    });

    const { error, value } = medIcineSchema.validate(req.body);

    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }

    const {
      medicineName,
      medicineId,
      quantity,
      description,
      disease,
      categories,
    } = value;
    console.log(value);
    console.log(medicineName);
    const saveMedicine = await Medicine.create({
      medicineName,
      medicineId,
      quantity,
      description,
      pharmacy: req.pharmacy._id,
      disease,
      categories,
      medicineImage: result.secure_url,
    });
    const pharmacyName = req.pharmacy.pharmacyName;
    return res.status(201).json({ saveMedicine, pharmacyName });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export const removeMedicine = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    //check if medicine exist
    const medicine = await Medicine.findById(id);

    if (!medicine) {
      res.status(400).json({ message: "no such medicine in system" });
    }

    const deleteMedicine = await Medicine.findByIdAndDelete(id);
    res.status(200).json({ message: "medicine removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const readMedicine = asyncHandler(async (req, res) => {
  try {
    const medicine = await Medicine.find({}).populate(
      "pharmacy",
      "pharmacyName -_id"
    );
    function isEmpty(medicine) {
      return medicine.length === 0;
    }
    if (isEmpty(medicine)) {
      return res.status(200).json({ message: "no medicine in the system " });
    } else {
      res.status(201).json(medicine);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const updateMedicine = asyncHandler(async (req, res) => {
  try {

    if (!req.file || !req.file.path) {
      res.status(400).json({ error: "File is missing or invalid" });
      return;
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const { id } = req.params;

    //check medicine
    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(400).json({ message: "no such medicine in system" });
    }

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      id,
      {
        medicineName: req.body.medicineName,
        medicineId: req.body.medicineId,
        quantity: req.body.quantity,
        description: req.body.description,
        medicineImage: result.secure_url,
        disease:req.body.disease
      },
      { new: true }
    );

    res.status(201).json(updatedMedicine);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

export const readMedicineById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    //check medicine
    const medicine = await Medicine.findById(id);
    if (!medicine) {
      return res.status(400).json({ message: "no such medicine in system" });
    }

    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const generateToken = (id) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
