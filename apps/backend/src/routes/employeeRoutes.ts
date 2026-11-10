import { Router } from "express";
import { employeeController } from "../controllers/employeeController.js";

const router = Router();

router.get("/departments", employeeController.getDepartments);
router.post("/employees", employeeController.createEmployee);

export default router;
