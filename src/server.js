import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDb } from "./config/db.js";
import cors from "cors";
import swaggerDoc from "swagger-ui-express";
import swaggerDocumentation from "./helper/documentation.js";
import AdminRouter from "./routes/AdminRouter.js";
import pharmacyRouter from "./routes/pharmacyDashBoardRouter.js";
import doctorRouter from "./routes/doctorDashBoardRouter.js";
import searchRouter from "./routes/search.js";
import bookingRouter from "./routes/booking.js";
import nurseRouter from "./routes/nurseDashBoardRouter.js";
import clientRouter from "./routes/clientRouter.js";
import hospitalRegister from './routes/hospitalRegister.js'
import pharmacyRegister from './routes/pharmcyRegister.js'
import nurseRegister from './routes/nurseRegister.js'
import doctorRegister from './routes/doctorRegister.js'
import approved from './routes/approved.js'
import  payments from "./routes/payments.js";
import feedBackRouter from "./routes/contact.js"
import morgan from "morgan";

//start dot.env
dotenv.config();
// connect to db
connectDb();
//start express app
const app = express();
//start cors
app.use(cors({ origin: true }));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
//router
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});

app.use("/api/admin/", AdminRouter);
app.use("/api/admin/dashboard", AdminRouter);
app.use("/api/pharmacy/dashboard/", pharmacyRouter);
app.use("/api/doctor/dashboard/", doctorRouter);
app.use("/api/search/", searchRouter);
app.use("/api/booking/", bookingRouter);
app.use("/api/nurse/dashboard/", nurseRouter);
app.use("/api/client/", clientRouter);
app.use('/api/register/hospital/',hospitalRegister)
app.use('/api/register/pharmacy/',pharmacyRegister)
app.use('/api/register/nurse/',nurseRegister)
app.use('/api/register/doctor/',doctorRegister)
app.use('/api/approved/',approved)
app.use('/api/payments/',payments)
app.use('/api/feedback/',feedBackRouter)
//documentation
app.use("/documentation", swaggerDoc.serve);
app.use("/documentation", swaggerDoc.setup(swaggerDocumentation));
app.get("/documentation.json", (req, res) => {
  res.getHeader("Content-Type", "application/json");
  res.send(swaggerDocumentation);
});
app.use(errorHandler);
