import { Router } from "express";
import multer from "multer";
import path from "path";
import { processClaim } from "../controllers/claim.controller.js";

// Configure Multer storage: save uploads to /uploads with a safe filename.
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${base}-${timestamp}${ext}`);
  },
});

const upload = multer({ storage });
const router = Router();

// Route to process FNOL claims: accepts a single file upload.
router.post("/claims/process", upload.single("file"), processClaim);

export default router;
