import { Router } from "express";
import { createStream, getStreams } from "../controllers/stream.js";

const router = Router();

router.post("/", createStream);
router.get("/:courseId", getStreams);

export default router;
