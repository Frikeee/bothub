import {Request, Response, Router} from "express";
import {CategoryService} from "@/api/category/category.service";
import {Category} from "@/api/category/category.type";
import {authMiddleware, isAdmin} from "@/auth.middleware";
import {createCategoryDto} from "@/api/category/category.dto";
import {SafeParseReturnType} from "zod";
import {asyncHandler} from "@/utils/handler-error";

const router = Router();

const categoryService = new CategoryService();

router.post('/', authMiddleware, isAdmin, asyncHandler (async (req: Request, res: Response) => {
    const validation: SafeParseReturnType<any, any> = await createCategoryDto.safeParseAsync(req.body);
    if (!validation.success) {
        res.status(400).json({message: validation.error.errors[0].message});
        return;
    }

    try {
        await categoryService.isExistCategory(req.body.category)
    } catch (error) {
        res.status(400).json({message: 'The category exist'});
    }

    try {
        const category: Category = await categoryService.create(req.body);
        res.status(200).json({category});
    } catch (error) {
        res.status(422).json({message: error});
    }
}));

router.get('/', asyncHandler (async (req: Request, res: Response) => {
    try {
        const category: Category[] = await categoryService.getAll()
        if (category.length === 0) {
            res.status(400).json({message: 'No data :['});
        }
        res.status(200).json({category});
    } catch (error) {
        res.status(404).json({message: error});
    }
}));

router.delete('/:category', authMiddleware, isAdmin, asyncHandler (async (req: Request, res: Response) => {
    const categoryParam: string = req.params.category;

    try {
        await categoryService.delete(categoryParam)
        res.status(200).json({message: `Successfully deleted ${categoryParam}`});
    } catch (error) {
        res.status(404).json({message: error});
    }
}));

export const categoryRouter = router;