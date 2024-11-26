import { body, param } from "express-validator";
import validate from "../middlewares/validate-middleware";

export const validateGenerateRecommendations = [
  body("user_id")
    .isString()
    .withMessage("user_id must be a string")
    .notEmpty()
    .withMessage("user_id is required"),
  body("preferences")
    .isArray()
    .withMessage("preferences must be an array")
    .custom((preferences) => preferences.length > 0)
    .withMessage("preferences must contain at least one item"),
  validate,
];

export const validateRetrieveRecommendations = [
  param("user_id")
    .isString()
    .withMessage("user_id must be a string")
    .notEmpty()
    .withMessage("user_id is required"),
  validate,
];
