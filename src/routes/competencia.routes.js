import { Router } from "express";
const router = Router();

router.get("/", () => {
  console.log("get competencia");
});

router.post("/", postPuesto);

router.delete("/", () => {
  console.log("delete competencia");
});

export default router;
