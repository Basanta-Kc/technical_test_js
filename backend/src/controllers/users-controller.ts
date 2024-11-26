import express, { Request, Response } from "express";
import { Recommendation } from "../models/recommendation";
import { getRecommendationsForUser } from "../services/recommendation-service";

export const getRecommendations = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const recommendations = await getRecommendationsForUser(user_id);
  return res.status(200).json(recommendations);
};
