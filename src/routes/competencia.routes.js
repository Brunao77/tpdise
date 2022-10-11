import { Router } from "express";
import { postCompetencia } from "../controllers/competencia.controller.js";

const router = Router();

router.get("/", () => {
  console.log("get competencia");
});

router.post("/", postCompetencia);

router.delete("/", () => {
  console.log("delete competencia");
});

export default router;
