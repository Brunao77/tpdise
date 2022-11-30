import { Router } from "express";
import { generarClave } from "../gestores/gestorEvaluaciones.js";

const router = Router();

router.post("/claves", generarClave);

export default router;
