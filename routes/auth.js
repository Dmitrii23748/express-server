import { Router } from "express";
import { registr, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Registr
router.post("/registr", registr);
// login
router.post("/login", login);
// Get Me
router.get("/getme", checkAuth, getMe);

// allPosts



export default router;
