import { Router } from "express";
import { login, register, projectedRoute } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/protected-route", verifyToken, projectedRoute);

export default router;
