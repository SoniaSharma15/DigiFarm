import express from "express";
import { createRequirement, deleteRequirement, getAllRequirements, updateRequirement } from "../controllers/buyer.controller.js";


const router = express.Router();

router.post("/add-requirement", createRequirement);
router.get("/get-all-requirement", getAllRequirements);


router.put("/:id", updateRequirement);
router.delete("/:id", deleteRequirement);

export default router;
