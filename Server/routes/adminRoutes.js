import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import {
  getPendingDoctors,
  updateDoctorStatus
} from "../controllers/adminController.js";

const router = express.Router();

// View pending doctors
router.get(
  "/pending-doctors",
  verifyToken,
  verifyRole("super_admin"),
  getPendingDoctors
);

// Approve / Reject doctor
router.put(
  "/verify-doctor/:id",
  verifyToken,
  verifyRole("super_admin"),
  updateDoctorStatus
);

export default router;