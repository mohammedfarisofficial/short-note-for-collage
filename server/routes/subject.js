import { Router } from "express";
import { createSubject } from "../controllers/subject.js";

const router = Router();

router.post("/", createSubject);

export default router;
