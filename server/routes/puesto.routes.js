import { Router } from "express";
import {
  buscarPuestos,
  getPonderaciones,
  getPuestos,
  postPuesto,
  deletePuesto,
} from "../gestores/gestorPuesto.js";

const router = Router();

router.get("/:codigo", getPuestos);
router.get("/", getPuestos);

router.get("/ponderaciones/:codigo", getPonderaciones);

router.post("/", postPuesto);
router.post("/buscar", buscarPuestos);

router.delete("/", deletePuesto);

export default router;
