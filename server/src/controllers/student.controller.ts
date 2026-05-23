// Functionality likes getAttendanceBySessionId,getAttendanceByStudent, getMaterial, getAllSubjects, etc. are handled in teacher.controller.ts with appropriate role checks since students also need access to those endpoints.

import { getStudentProfileByIdService, assignmentSubmissionService } from "../services/student.service.js";
import { Response } from "express";
import { AuthRequest } from "../types/auth.types.js";

export const studentProfileById = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await getStudentProfileByIdService(
      req.user.id as string | undefined,
    );
    res.status(200).json({
      success: true,
      profile: profile,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};

export const assignmentSubmission = async (req: AuthRequest, res: Response) => {
  try {
    const { subjectId, assignmentId } = req.body;
    const result = await assignmentSubmissionService(
      req.user.id as string | undefined,
      subjectId,
      assignmentId,
    );
    res.status(200).json({
      success: true,
      message: "Assignment submitted successfully",
      result: result,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};
