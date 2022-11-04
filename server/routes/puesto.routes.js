import { Router } from "express";
import { getPuestos, postPuesto, getPuesto } from "../gestores/gestorPuesto.js";

const router = Router();

router.get("/:codigo", getPuesto);

router.post("/", postPuesto);

router.delete("/", () => {
  console.log("delete puestos");
});

export default router;
