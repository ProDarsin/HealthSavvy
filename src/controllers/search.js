import { Search } from "../models/search.js";
import asyncHandler from "express-async-handler";
import { Hospital } from "../models/hospital.js";
import { Medicine } from "../models/medecine.js";
import { Pharmacy } from "../models/pharmacy.js";
import { Users } from "../models/userModels.js";
export const SearchHospital = asyncHandler(async (req, res) => {
  try {
    const query = req.query.specialization;
    console.log(query);
    const search = await Hospital.find({
      specialization: query,
    }).select("specialization location hospitalName hospitalImage");
    console.log(search);
    res.status(200).json(search);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export const SearchMedicine = asyncHandler(async (req, res) => {
  try {
    const query = req.query.medicine;
    const search = await Medicine.find({ medicineName: query })
      .populate("pharmacy", "pharmacyName -_id disease")
      .select("-date ");
    res.status(200).json(search);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export const SearchPharmacy = asyncHandler(async (req, res) => {
  try {
    const query = req.query.Pharmacy;
    const search = await Pharmacy.find({ pharmacyName: query }).select(
      "pharmacistName location pharmacyImage pharmacyName "
    );
    console.log(search);
    res.status(200).json(search);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export const SearchDoctor = asyncHandler(async (req, res) => {
  try {
    const query = req.query.specialization;
    const search = await Users.find({ specialization: query }).select(
      "firstName lastName role phoneNumber phoneNumber email location"
    );
    res.status(200).json(search);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export const SearchNurse = asyncHandler(async (req, res) => {
  try {
    const query = req.query.specialization;
    const search = await Users.find({ specialization: query }).select(
      "firstName lastName role phoneNumber phoneNumber email location"
    );
    res.status(200).json(search);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
