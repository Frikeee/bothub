import {z} from "zod";

export const createCategoryDto = z.object({
    category: z.string({required_error: 'The category is required'}).min(1, 'The category field is too small'),
})