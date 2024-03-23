import Jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Pharmacy } from "../models/pharmacy.js";
import { Users } from "../models/userModels.js";
export const protectPharmacy = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token  from header

      token = req.headers.authorization.split(" ")[1];
      //verify token and keep payload in decode
      const decode = Jwt.verify(token, process.env.JWT_SECRET);
      req.pharmacy = await Pharmacy.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send("not authorized".red.underline);
    }
    if (!token) {
      res.status(401).send("not authorized no token".red.underline);
    }
  }
});

export const protectUser = asyncHandler(async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //get token from headers
      token = req.headers.authorization.split(" ")[1];

      //verify token and keep payload in decode

      const decode = Jwt.verify(token, process.env.JWT_SECRET);

      // keep user document in req.user
      req.user = await Users.findById(decode.id).select("-password");
      next();
    }
    if (!token) {
      res.status(401).send("not authorized no token".red.underline);
    }
  } catch (error) {
    res.status(401).send("not authorized".red.underline);
  }
});

export const protectClient = asyncHandler(async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //get token from headers
      token = req.headers.authorization.split(" ")[1];

      //verify token and keep payload in decode

      const decode = Jwt.verify(token, process.env.JWT_SECRET);

      // keep user document in req.user
      req.client = await Users.findById(decode.id).select("-password");
      next();
    }

    if (!token) {
      return res.status(401).send("not authorized no token".red.underline);
    }
  } catch (error) {
    return res.status(401).send("not authorized".red.underline);
  }
});

export const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // get token
      token = req.headers.authorization.split(" ")[1];
      const decode = Jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Users.findById(decode.id).select("-password");
      next();
    }
  } catch (error) {
    return res.status(401).send("not authorized".red.underline);
  }
  if (!token) {
    res.status(401).send("not authorized no token".red.underline);
  }
});
