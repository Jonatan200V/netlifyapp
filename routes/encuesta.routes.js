import { Router } from "express";
import {
  createEncuesta,
  getAllEncuesta,
  existEncuest,
  dateEncuest,
} from "../controllers/Encuesta.controller.js";

const router = Router();

router.get("/create/form", getAllEncuesta);
// router.get("/completed/:id", existEncuest);
router.post("/create/form", existEncuest, createEncuesta);
router.post("/date/form", dateEncuest);
export default router;
