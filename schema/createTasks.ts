import { z } from "zod";
export const createTaskSchema=z.object({
    collectionId: z.string(),
    content: z.string().min(5, 'Task content must be atleast 5 characters'),
    expiresAt: z.date().optional()
})

export type createTaskSchemaType=z.infer<typeof createTaskSchema>