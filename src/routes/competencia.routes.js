import { Router } from "express";
import {
  postCompetencia,
  getCompetencias,
} from "../controllers/competencia.controller.js";

const router = Router();

router.get("/", getCompetencias);

router.post("/", postCompetencia);

router.delete("/", () => {
  console.log("delete competencia");
});

export default router;
