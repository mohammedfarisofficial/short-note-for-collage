import { Router } from "express";
import { createSemester } from "../controllers/semester.js";

const router = Router();

router.post("/", createSemester);

export default router;
