import prisma from "@/prisma.service";
import {Status} from "@/api/status/status.type";


export class StatusService {
    async create(status: Status) {
        return await prisma.status.create({
            data: {
                ...status
            }
        })
    }

    async delete(status: string) {
        return await prisma.status.delete({
            where:{
                status: status
            }
        })
    }

    async getAll() {
        return await prisma.status.findMany()
    }

    async isExistStatus(status: string) {
        const existStatus: Status | null = await prisma.status.findUnique({
            where: { status }
        })
        if (existStatus) {
            throw new Error();
        }
        return existStatus;
    }
}