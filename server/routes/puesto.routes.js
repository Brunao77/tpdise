import { Router } from "express";
import { postPuesto } from "../gestores/gestorPuesto.js";

const router = Router();

router.get("/", () => {
  console.log("get puestos");
});

router.post("/", postPuesto);

router.delete("/", () => {
  console.log("delete puestos");
});

export default router;
