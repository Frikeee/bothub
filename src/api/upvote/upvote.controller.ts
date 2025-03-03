import {Request, Response, Router} from "express";
import {authMiddleware, isAdmin, isValidToken} from "@/auth.middleware";
import {UpvoteService} from "@/api/upvote/upvote.service";
import {Upvote} from "@/api/upvote/upvote.type";
import {SafeParseReturnType} from "zod";
import {createUpvoteDto} from "@/api/upvote/upvote.dto";
import {asyncHandler} from "@/utils/handler-error";
import {ProposalService} from "@/api/proposal/proposal.service";

const router = Router();

const upvoteService = new UpvoteService();
const proposalService = new ProposalService();

router.post('/', authMiddleware,  asyncHandler (async (req: Request, res: Response) => {
    const validation: SafeParseReturnType<any, any> = await createUpvoteDto.safeParseAsync(req.body);
    if (!validation.success) {
        res.status(400).json({message: validation.error.errors[0].message});
        return;
    }

    const userInfo = isValidToken(req, res)

    try {
        const upvote: Upvote = await upvoteService.create(req.body, userInfo!);
        await proposalService.changesVote(upvote.proposalId, '+')
        res.status(200).json({upvote});
    } catch (error) {
        res.status(422).json({message: error});
    }
}));

router.get('/',authMiddleware, isAdmin,  asyncHandler (async (req: Request, res: Response) => {
    try {
        const upvote: Upvote[] = await upvoteService.getAll();
        if (upvote.length === 0) {
            res.status(400).json({message: 'No data :['});
        }
        res.status(200).json({upvote});
    } catch (error) {
        res.status(404).json({message: error});
    }
}));

router.get('/:id', authMiddleware,  asyncHandler (async (req: Request, res: Response) => {
    const idParam: string = req.params.id;
    try {
        const upvote: Upvote | null = await upvoteService.getOne(idParam);
        if (!upvote) {
            res.status(404).json({message: 'No data :['});
        }
        res.status(200).json({upvote});
    } catch (error) {
        res.status(404).json({message: error});
    }
}));

router.delete('/:id', authMiddleware,  asyncHandler (async (req: Request, res: Response) => {
    const idParam: string = req.params.id;

    try {
        const upvote: Upvote | null = await upvoteService.getOne(idParam);
        if (!upvote) {
            res.status(404).json({message: 'No data :['});
            return;
        }

        await proposalService.changesVote(upvote!.proposalId, '-')
        await upvoteService.delete(idParam);

        res.status(200).json({message: `Successfully deleted ${idParam}`});
    } catch (error) {
        res.status(404).json({message: error});
    }
}));

export const upvoteRouter = router;