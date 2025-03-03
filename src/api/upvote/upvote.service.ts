import prisma from "@/prisma.service";
import {UserJwtType} from "@/types/user-jwt.type";
import {Upvote} from "@/api/upvote/upvote.type";


export class UpvoteService {
    async create(upvote: Upvote, userInfo: UserJwtType) {
        return await prisma.upvote.create({
            data: {
                ...upvote,
                userId: userInfo.id
            }
        })
    }

    async getAll() {
        return await prisma.upvote.findMany({})
    }

    async getOne(id: string) {
        return await prisma.upvote.findUnique({
            where: { id }
        })
    }

    async delete(upvoteId: string) {
        return await prisma.upvote.delete({
            where:{
                id: upvoteId
            }
        })
    }
}