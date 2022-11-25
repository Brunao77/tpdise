import { Router } from "express";
import { loginConsultor, loginCandidato, addConsultor } from "../gestores/gestorAutenticacion.js"

const router = Router();

router.post("/candidato", loginCandidato);
router.post("/consultor", loginConsultor);

router.post("/newConsultor", addConsultor);

export default router;