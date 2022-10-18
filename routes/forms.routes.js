import { Router } from "express";
import { signIn, signUp } from "../controllers/forms.controller.js";
const router = Router();

router.post("/login", signIn);
router.post("/logout", signUp);

export default router;
