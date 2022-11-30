import { Router } from "express";
import { getPonderaciones, getPuestos, postPuesto } from "../gestores/gestorPuesto.js";

const router = Router();

router.get("/:codigo", getPuestos);
router.get("/", getPuestos);

router.get("/ponderaciones/:codigo", getPonderaciones);

router.post("/", postPuesto);

router.delete("/", () => {
  console.log("delete puestos");
});

export default router;
