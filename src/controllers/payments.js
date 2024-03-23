import Paypack from "paypack-js";
import Joi from "joi";
import { Transaction } from "../models/payments.js";
export const paymentsIn = async (req, res) => {
  try {
    let paySchema = Joi.object({
      number: Joi.string().required(),
      amount: Joi.number().required(),
    });

    const { error, value } = paySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { number, amount } = value;
    Paypack.config({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });
    const result = await Paypack.cashin({
      number: number,
      amount: amount,
      environment: "development",
    });
    console.log(result);
    res.status(201).json({ data: result.data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// export const paymentsOut = async (req, res) => {
//     try {

//       let paySchema= Joi.object({
//         number:Joi.string().required(),
//         amount:Joi.number().required()
//       })

//       const {error,value}= paySchema.validate(req.body)
//       if(error){
//         return res.status(400).json({error:error.details[0].message})
//       }
//       const{
//         number,
//         amount
//       }=value
//       Paypack.config({ client_id:process.env.CLIENT_ID, client_secret:process.env.CLIENT_SECRET,  });
//       const result = await Paypack.cashout({
//         number: number,
//         amount: amount,
//         environment: "development",
//       });
//       console.log(result);
//       res.status(201).json({ data: result.data });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ error: error.message });
//     }
//   };

export const transaction = async (req, res) => {
  try {
    Paypack.config({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });
    const result = await Paypack.transactions({ offset: 0, limit: 100 });
    console.log(result.data);
    const savedTransaction= await Transaction.create({transaction:result.data})
    res.status(201).json({ data: result.data,transaction:savedTransaction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};


