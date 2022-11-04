import { Router } from "express";
import {
  postCompetencia,
  getCompetencias,
  getCompetencia,
} from "../gestores/gestorCompetencia.js";

const router = Router();
router.get("/:codigo", getCompetencia);

router.get("/", getCompetencias);

router.post("/", postCompetencia);

router.delete("/", () => {
  console.log("delete competencia");
});

export default router;
