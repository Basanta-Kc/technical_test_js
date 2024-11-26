import express from "express";
import { generateRecommendations } from "../controllers/recommendations-controller";
import {
  validateGenerateRecommendations,
} from "../validators/recommendations-validator";

const router = express.Router();

// POST /recommendations - Generate recommendations
router.post("/", validateGenerateRecommendations, generateRecommendations);

export default router;
