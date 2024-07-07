import { Router } from "express";
import { createUniversity } from "../controllers/university.js";

const router = Router();

router.post("/", createUniversity);

export default router;
