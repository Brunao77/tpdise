import { Router } from "express";
import { buscarPuestos, getPonderaciones, getPuestos, postPuesto } from "../gestores/gestorPuesto.js";

const router = Router();

router.get("/:codigo", getPuestos);
router.get("/", getPuestos);

router.get("/ponderaciones/:codigo", getPonderaciones);

router.post("/", postPuesto);
router.post("/buscar", buscarPuestos);

router.delete("/", () => {
  console.log("delete puestos");
});

export default router;
