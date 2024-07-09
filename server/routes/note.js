import { Router } from "express";
import { uploadNote } from "../controllers/note.js";

const router = Router();

router.post("/", uploadNote);

export default router;
