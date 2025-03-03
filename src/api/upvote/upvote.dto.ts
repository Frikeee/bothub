import {z} from "zod";

export const createUpvoteDto = z.object({
    proposalId: z.string({required_error: 'The proposalId is required'}).uuid(),
})