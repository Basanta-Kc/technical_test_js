import { z } from "zod"

export const userIdSchema = z.string().min(1, "User ID is required")

export const interestsSchema = z.object({
  userId: userIdSchema,
  interests: z.array(z.string().min(1, "Interest cannot be empty")).min(1, "At least one interest is required").max(5, "Maximum 5 interests allowed"),
})

export type InterestsFormData = z.infer<typeof interestsSchema>

