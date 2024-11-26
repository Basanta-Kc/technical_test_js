import { Request, Response } from "express";
import { generateRecommendationsForUser } from "../services/recommendation-service";

// Generate Recommendations
export const generateRecommendations = async (req: Request, res: Response) => {
  const { user_id, preferences } = req.body;

  const recommendations = await generateRecommendationsForUser(req.body);

  return res.status(201).json(recommendations);
};
