import axios from "axios";
import { LLM_URL } from "../utils/constants";

export const fetchRecommendationsFromLLM = async (
  preferences: string[]
): Promise<string[]> => {
  const response = await axios.post(LLM_URL, {
    preferences,
  });
  return response.data.recommendations;
};
