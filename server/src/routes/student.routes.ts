import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/roleBased.middleware.js";
import { studentProfileById, assignmentSubmission } from "../controllers/student.controller.js";

const router = express.Router();

router.get(
  "/student-profile",
  authMiddleware,
  authorizeRoles("STUDENT"),
  studentProfileById,
);

router.post(
  "/student-submit-assignment",
  authMiddleware,
  authorizeRoles("STUDENT"),
  assignmentSubmission,
);

export default router;
