import { Router } from "express"
import {
  getEmployees, postEmployees,
  putEmployees, deleteEmployees, getUnicEmployee
} from "../controllers/employees.controllers.js"


const router = Router()

router.get("/employees", getEmployees)
router.get("/employees/:id", getUnicEmployee)
router.post("/employees", postEmployees)
router.put("/employees/:id", putEmployees)
router.delete("/employees/:id", deleteEmployees)

export default router