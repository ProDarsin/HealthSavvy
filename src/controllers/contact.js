import { Contact } from "../models/contact.js";
import AsyncHandler from "express-async-handler";
import Joi from "joi";

export const feedback = AsyncHandler(async (req, res) => {
  try {
    const contactSchema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      message: Joi.string().required(),
    });

    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }
    const { firstName, lastName, message } = value;

    const contact = await Contact.create({
      firstName,
      lastName,
      message,
    });
    return res.status(200).json({ contact });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export const getFeedBack=AsyncHandler(async (req, res) => {
  try {
   
    const contact = await Contact.find({});
    return res.status(200).json({ contact });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});