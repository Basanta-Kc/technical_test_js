// src/utils/schemas.ts

// TODO: Define request and response validation schemas.

// Hints:
// - Use `express-validator` to create validation chains for incoming requests.
// - For the `/promotions` endpoint:
//   - Validate that `clientId` is a non-empty string.
//   - Validate that `productInterests` is a non-empty array of non-empty strings.
// - Define TypeScript interfaces for type checking if needed.

// Example interfaces and validation chains (for candidate to use):

/*
import { body, ValidationChain } from 'express-validator';

export const validatePromotionRequest: ValidationChain[] = [
  body('clientId')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('clientId is required and must be a non-empty string'),
  body('productInterests')
    .isArray({ min: 1 })
    .withMessage('productInterests must be a non-empty array'),
  body('productInterests.*')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Each product interest must be a non-empty string'),
];

// Define interfaces

export interface PromotionRequest {
  clientId: string;
  productInterests: string[];
}

export interface PromotionResponse {
  clientId: string;
  promotions: string[];
}
*/
