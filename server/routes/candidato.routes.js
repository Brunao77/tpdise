import { Router } from "express";
import { getCandidatos, newCandidato, verificarCuestionarios } from "../gestores/gestorCandidato.js";
import { newCuestionario } from "../gestores/gestorCuestionarios.js";

const router = Router();

router.get("/", getCandidatos);
router.post("/new", newCandidato);
router.post("/verificar", verificarCuestionarios)

//temp
router.post("/newCuestionario", newCuestionario);

export default router;