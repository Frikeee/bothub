import {Category} from "@/api/category/category.type";
import prisma from "@/prisma.service";


export class CategoryService {
    async create(category: Category): Promise<Category> {
        return await prisma.category.create({
            data: {
                ...category
            }
        });
    }

    async delete(category: string): Promise<Category> {
        return await prisma.category.delete({
            where:{
                category: category
            }
        })
    }

    async getAll(): Promise<Category[]> {
        return await prisma.category.findMany();
    }

    async isExistCategory(category: string): Promise<null>{
        const existCategory: Category | null = await prisma.category.findUnique({
            where: { category }
        })
        if (existCategory) {
            throw new Error();
        }
        return existCategory;
    }
}