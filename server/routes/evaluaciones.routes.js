import { Router } from "express";
import { crearEvaluacion, generarClave } from "../gestores/gestorEvaluaciones.js";

const router = Router();

router.post("/claves", generarClave);
router.post("/new", crearEvaluacion);

export default router;
