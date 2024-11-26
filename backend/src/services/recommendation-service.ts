import { Recommendation } from "../models/recommendation";
import { setCache, getCache } from "../cache";
import { fetchRecommendationsFromLLM } from "./llm-service";
import { NotFoundError } from "../errors/not-found-error";

/**
 * Generate recommendations and persist them in the database and cache.
 * @param user_id - The user ID.
 * @param preferences - The user's preferences.
 * @returns - The generated recommendations.
 */
export const generateRecommendationsForUser = async ({
  user_id,
  preferences,
}: {
  user_id: string;
  preferences: string[];
}) => {
  // Fetch recommendations from LLM
  const recommendations = await fetchRecommendationsFromLLM(preferences);

  // Save recommendations in cache
  setCache(user_id, recommendations);

  // Upsert recommendations in the database
  await Recommendation.findOneAndUpdate(
    { user_id },
    { recommendations },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return { user_id, recommendations };
};

/**
 * Retrieve recommendations for a user from the database or cache.
 * @param user_id - The user ID.
 * @returns - The user's recommendations.
 */
export const getRecommendationsForUser = async (
  user_id: string
): Promise<{ user_id: string; recommendations: string[] }> => {
  // Attempt to fetch recommendations from the cache
  const cachedRecommendations = getCache<string[]>(user_id);
  if (cachedRecommendations) {
    return { user_id, recommendations: cachedRecommendations };
  }

  // Fetch recommendations from the database
  const recommendations = await Recommendation.findOne({ user_id });
  if (!recommendations) {
    throw new NotFoundError();
  }

  // Store fetched recommendations in the cache
  setCache(user_id, recommendations.recommendations);
  
  return {
    user_id,
    recommendations: recommendations.recommendations,
  };
};
