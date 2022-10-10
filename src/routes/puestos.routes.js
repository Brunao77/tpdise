import { Router } from "express";

const router = Router();

router.get("/", () => {
  console.log("get puestos");
});
router.post("/", () => {
  console.log("post puestos");
});
router.delete("/", () => {
  console.log("delete puestos");
});

export default router;
