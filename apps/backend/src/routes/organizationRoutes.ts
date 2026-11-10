import { Router } from "express";
import { organizationController } from "../controllers/organizationController.js";

const router = Router();

router.get("/roles", organizationController.getRoles);
router.post("/roles", organizationController.createRole);

export default router;
