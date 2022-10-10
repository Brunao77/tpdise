import { Router } from "express";
import { postPuesto } from "../controllers/puesto.controller.js";
const router = Router();

router.get("/", () => {
  console.log("get puestos");
});
router.post("/", postPuesto);
router.delete("/", () => {
  console.log("delete puestos");
});

export default router;
