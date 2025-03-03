import prisma from "@/prisma.service";
import {Proposal} from "@/api/proposal/proposal.type";
import {QProposal} from "@/types/query-proposal.type";
import {UserJwtType} from "@/types/user-jwt.type";


export class ProposalService {
    
    async create(proposal: Proposal, userInfo: UserJwtType) {
        return await prisma.proposal.create({
            data: {
                ...proposal,
                authorId: userInfo.id
            }
        })
    }

    async getAll(queryParams: QProposal) {
        const {
            countInPage,
            numberPage,
            status,
            category,
            sorting,
            sortingDirection
        } = queryParams;

        const where: any = {};

        where.statusName = status ?? { not: '' };
        where.categoryName = category ?? { not: '' };

        const validSortingFields = ['createdAt', 'updatedAt'];
        const orderBy: any = sorting && validSortingFields.includes(sorting)
            ? {[sorting]: sortingDirection === '1' ? 'desc' : 'asc'}
            : {createdAt: sortingDirection === '1' ? 'desc' : 'asc'};

        const take = Number(countInPage) > 0 ? Number(countInPage) : 10;
        const skip = Math.max((Number(numberPage ?? 1) - 1) * take, 0);

        return await prisma.proposal.findMany({
            where,
            orderBy,
            take,
            skip
        })
    }

    async getOne(id: string) {
        return await prisma.proposal.findUnique({
            where: {id}
        })
    }

    async update(proposal: Proposal) {
        return await prisma.proposal.update({
            where: { id: proposal.id },
            data: {
                ...proposal,
                authorId: proposal.authorId
            }
        })
    }

    async delete(proposalId: string) {
        return await prisma.proposal.delete({
            where:{
                id: proposalId
            }
        })
    }

    async changesVote(proposalId: string, symbol: string) {
        const updateData: any = {};

        if (symbol === '+') {
            updateData.countVote = {
                increment: 1,
            };
        } else if (symbol === '-') {
            updateData.countVote = {
                decrement: 1,
            };
        }

        await prisma.proposal.update({
            where: {
                id: proposalId,
            },
            data: updateData,
        });
    }
}