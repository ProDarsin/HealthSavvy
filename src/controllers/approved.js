import asyncHandler from "express-async-handler";
import { Users } from "../models/userModels.js";
import { Hospital } from "../models/hospital.js";
import { Pharmacy } from "../models/pharmacy.js";
export const approvedHospital= asyncHandler(async(req,res)=>{

    try {
          const {id}= req.params
        const {status}= req.body
        
        const hospital= await Hospital.findOneAndUpdate({id},{status:status},{ returnOriginal: false })
        
        res.status(201).json({status:"approved",hospital})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message})
    }
})

export const approvedPharmacy= asyncHandler(async(req,res)=>{

    try {
          const {id}= req.params
        const {status}= req.body
        
        const pharmacy= await Pharmacy.findOneAndUpdate({id},{status:status},{ returnOriginal: false })
        
        res.status(201).json({status:"approved",pharmacy})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message})
    }
})

export const approvedDoctor= asyncHandler(async(req,res)=>{

    try {
          const {id}= req.params
        const {status}= req.body
        
        const doctor= await Users.findOneAndUpdate({id},{status:status},{ returnOriginal: false })
        
        res.status(201).json({status:"approved",doctor})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message})
    }
})

export const approvedNurse= asyncHandler(async(req,res)=>{

    try {
          const {id}= req.params
        const {status}= req.body
        
        const nurse= await Users.findOneAndUpdate({id},{status:status},{ returnOriginal: false })
        
        res.status(201).json({status:"approved",nurse})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message})
    }
})
export const getApprovedHospital= asyncHandler(async(req,res)=>{
    try {
        
        const displayApproved= await Hospital.find({status:'approved'})
        return res.status(200).json(displayApproved)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message})
    }
})