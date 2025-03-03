import {Request, Response, Router} from "express";
import {authMiddleware, isValidToken} from "@/auth.middleware";
import {ProposalService} from "@/api/proposal/proposal.service";
import {Proposal} from "@/api/proposal/proposal.type";
import {SafeParseReturnType} from "zod";
import {createProposalDto} from "@/api/proposal/proposal.dto";
import {asyncHandler} from "@/utils/handler-error";

const router = Router();

const proposalService = new ProposalService();

router.post('/', authMiddleware, asyncHandler (async (req: Request, res: Response) => {
    const validation: SafeParseReturnType<any, any> = await createProposalDto.safeParseAsync(req.body);
    if (!validation.success) {
        res.status(400).json({message: validation.error.errors[0].message});
    }

    const userInfo = isValidToken(req, res)

    //Нет проверки на уникальность proposal, поскольку не знаю по каким полям нужно проводить

    try {
        const proposal: Proposal = await proposalService.create(req.body, userInfo!);
        res.status(200).json({proposal});
    } catch (error) {
        res.status(422).json({message: error});
    }
}));

router.get('/', asyncHandler (async (req: Request, res: Response) => {
    const queryParam = req.query;
    try {
        const proposal: Proposal[] = await proposalService.getAll(queryParam);
        if (proposal.length === 0) {
            res.status(404).json({message: 'No data :['});
        }
        res.status(200).json({proposal});
    } catch (error) {
        res.status(404).json({message: error});
    }
}));

router.get('/:id', asyncHandler (async (req: Request, res: Response) => {
    const idParam: string = req.params.id;
    try {
        const proposal: Proposal | null = await proposalService.getOne(idParam);
        if (!proposal) {
            res.status(404).json({message: 'No data :['});
        }
        res.status(200).json({proposal});
    } catch (error) {
        res.status(404).json({message: error});
    }
}));

router.put('/', authMiddleware, asyncHandler (async (req: Request, res: Response) => {
    const validation: SafeParseReturnType<any, any> = await createProposalDto.safeParseAsync(req.body);
    if (!validation.success) {
        res.status(400).json({message: validation.error.errors[0].message});
    }

    const isExistProposal: Proposal | null = await proposalService.getOne(req.body.id);
    if (!isExistProposal) {
        res.status(404).json({message: 'Does not exist proposal :['});
    }

    try {
        const proposal: Proposal = await proposalService.update(req.body);
        res.status(200).json({proposal});
    } catch (error) {
        res.status(404).json({message: error});
    }
}));

router.delete('/:id', authMiddleware, asyncHandler (async (req: Request, res: Response) => {
    const idParam: string = req.params.id;

    try {
        await proposalService.delete(idParam);
        res.status(200).json({message: `Successfully deleted ${idParam}`});
    } catch (error) {
        res.status(404).json({message: error});
    }
}));

export const proposalRouter = router;