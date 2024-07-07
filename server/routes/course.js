import { Router } from "express";
import { createCourse } from "../controllers/course.js";

const router = Router();

router.post("/", createCourse);

export default router;
