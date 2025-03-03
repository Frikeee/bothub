import {Request, Response, Router} from "express";
import {authMiddleware, isAdmin} from "@/auth.middleware";
import {StatusService} from "@/api/status/status.service";
import {Status} from "@/api/status/status.type";
import {SafeParseReturnType} from "zod";
import {createStatusDto} from "@/api/status/status.dto";
import {asyncHandler} from "@/utils/handler-error";

const router = Router();

const statusService = new StatusService();

router.post('/', authMiddleware, isAdmin, asyncHandler (async (req: Request, res: Response) => {
    const validation: SafeParseReturnType<any, any> = await createStatusDto.safeParseAsync(req.body);
    if (!validation.success) {
        res.status(400).json({message: validation.error.errors[0].message});
        return;
    }

    try {
        await statusService.isExistStatus(req.body.status)
    } catch (error) {
        res.status(400).json({message: 'The status exist'});
    }

    try {
        const status: Status = await statusService.create(req.body);
        res.status(200).json({status});
    } catch (error) {
        res.status(422).json({message: error});
    }
}))

router.get('/', asyncHandler (async (req: Request, res: Response) => {
    try {
        const status: Status[] = await statusService.getAll()
        if (status.length === 0) {
            res.status(400).json({message: 'No data :['});
        }
        res.status(200).json({status});
    } catch (error) {
        res.status(404).json({message: error});
    }
}));

router.delete('/:status', authMiddleware, isAdmin, asyncHandler (async (req: Request, res: Response) => {
    const statusParam: string = req.params.status;

    try {
        await statusService.delete(statusParam)
        res.status(200).json({message: `Successfully deleted ${statusParam}`});
    } catch (error) {
        res.status(404).json({message: error});
    }
}));

export const statusRouter = router;