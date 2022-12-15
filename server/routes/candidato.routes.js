import { Router } from "express";
import {
  getCandidatos,
  newCandidato,
  verificarCuestionarios,
} from "../gestores/gestorCandidato.js";

const router = Router();

router.get("/", getCandidatos);
router.post("/", newCandidato);
router.post("/verificar", verificarCuestionarios);

export default router;
