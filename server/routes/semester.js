import { Router } from "express";
import { createSemester, getSemesters } from "../controllers/semester.js";

const router = Router();

router.post("/", createSemester);
router.get("/:streamId", getSemesters);

export default router;
