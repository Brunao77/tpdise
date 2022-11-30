import { Router } from "express";
import { initDB } from "../gestores/createDB.js";
import { loginConsultor, loginCandidato, addConsultor } from "../gestores/gestorAutenticacion.js"

const router = Router();

router.post("/candidato", loginCandidato);
router.post("/consultor", loginConsultor);

router.post("/newConsultor", addConsultor);

router.get("/initDB", initDB);

export default router;