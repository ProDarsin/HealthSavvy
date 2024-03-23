import cloudinary from "./cloudinary.js";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from "multer";
import path from 'path'

export const upload = multer({
  storage: multer.diskStorage({}),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb({ message: "unsupported file format" }, false);
    }
  },
});