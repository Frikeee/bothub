import {z} from "zod";


export const createProposalDto = z.object({
        title: z.string({required_error: 'The title is required'}).min(1, 'The title field is too small'),
        description: z.string({required_error: 'The description is required'}).min(1, 'The description field is too small'),
        categoryName: z.string({required_error: 'The categoryId is required'}).min(1, 'The categoryId field is too small'),
        statusName: z.string({required_error: 'The statusId is required'}).min(1, 'The statusId field is too small'),
})