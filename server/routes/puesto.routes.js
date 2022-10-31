import { Router } from "express";
import { getPuestos, postPuesto } from "../gestores/gestorPuesto.js";

const router = Router();

router.get("/:codigo", getPuestos);

router.post("/", postPuesto);

router.delete("/", () => {
  console.log("delete puestos");
});

export default router;
