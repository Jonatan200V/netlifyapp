import { Router } from "express";
import {
  createUser,
  getAllUser,
  getUser,
} from "../controllers/User.controller.js";
import { auth } from "../midlleware/Auth.midlleware.js";
const router = Router();

router.get("/user", auth, getAllUser);
router.get("/user/:id", getUser);
router.post("/user", createUser);
// router.get("/user");

export default router;
