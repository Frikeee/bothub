import {z} from "zod";

export const createStatusDto = z.object({
    status: z.string({required_error: 'The status is required'}).min(1, 'The status field is too small'),
})