import AdminDashboard from "../routes/admin.doc.js";
import PharmacyDashboard from "../routes/pharmacy.doc.js";
import DoctorDashboard from "../routes/doctor.doc.js";
import NurserDashboard from "../routes/nurse.doc.js";
import Search from "../routes/search.doc.js";
import booking from "../routes/booking.doc.js";
import client from "../routes/client.doc.js";
import RegisterHospitals from "../routes/hospitalRegister.doc.js";
import RegisterPharmacys from "../routes/pharmacyRegister.doc.js";
import RegisterNurses from "../routes/nurseRegister.doc.js";
import RegisterDoctors from "../routes/doctorRegister.doc.js";
import paymentsRoutes from "../routes/payments.doc.js"
import messageRoutes from "../routes/contact.doc.js"
const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "Health Savvy",
    version: "0.0.1",
    description: "Health Savvy api build in node/express",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "local dev",
    },
    {
      url: "https://health-savvy.onrender.com",
      description: "production dev",
    },
  ],

  tags: [
    {
      name: "Admin Dashboard",
      description: "admin routes",
    },
    {
      name: "Pharmacy Dashboard",
      description: "Pharmacy routes",
    },
    {
      name: "Doctor Dashboard",
      description: "Doctor routes",
    },
    {
      name: "Nurse Dashboard",
      description: "Nurse routes",
    },
    {
      name: "Search",
      description: "Search routes",
    },
    {
      name: "Booking",
      description: "booking routes",
    },
    {
      name: "client",
      description: "client  routes",
    },
    {
      name: "Register Hostipal",
      description: "hospital  routes",
    },
    {
      name: "Register Pharmacy",
      description: "pharmacy  routes",
    },
    {
      name: "Register Doctor",
      description: "doctor  routes",
    },
    {
      name: "Register Nurse",
      description: "pharmacy  routes",
    },
    {
      name: "Payments",
      description: "payments routes",
    },
    {
      name: "FeedBack",
      description: "feedback routes",
    },
  ],
  components: {
    securitySchemes: {
      authorization: {
        type: "apiKey",
        scheme: "Bearer",
        bearerFormat: "JWT",
        name: "authorization",
        in: "header",
      },
    },
  },
  paths: {
    ...AdminDashboard,
    ...PharmacyDashboard,
    ...DoctorDashboard,
    ...NurserDashboard,
    ...Search,
    ...booking,
    ...client,
    ...RegisterHospitals,
    ...RegisterPharmacys,
    ...RegisterNurses,
    ...RegisterDoctors,
    ...paymentsRoutes,
    ...messageRoutes
  },
  apis: ["../routes/**/*.js"],
};
export default swaggerDocumentation;
