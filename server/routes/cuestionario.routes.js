import { Router } from "express";
import { getCuestionario, inicializarCuestionario } from "../gestores/gestorCuestionarios.js";

const router = Router();

router.get("/:nroCandidato", getCuestionario);
router.post("/:nroCandidato", inicializarCuestionario);

export default router;