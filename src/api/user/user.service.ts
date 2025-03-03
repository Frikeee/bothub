import prisma from "@/prisma.service";
import {SecureUser, User} from "@/api/user/user.type";
import bcrypt  from  "bcrypt-ts" ;
import jwt from "jsonwebtoken";
import process from "node:process";
import {UserJwtType} from "@/types/user-jwt.type";



export class UserService {
    async createUser(user: User) {
        const hashedPassword: string = await bcrypt.hash(user.password, 10);

        const createdUser: User = await prisma.user.create({
            data: {
                ...user,
                password: hashedPassword,
            }
        })
        return {user: this.restructureUser(createdUser), jwt: this.createJwtToken(user)};
    }

    async getUser(authToken: string) {
        const userJwtInfo = jwt.verify(authToken, process.env.JWT_SECRET!) as {id: string};
        const user: User | null = await prisma.user.findUnique({
            where: {
                id: userJwtInfo.id
            }
        });
        return this.restructureUser(user);
    }

    async signIn(password: string, userPassword: string) {
        return await bcrypt.compare(password, userPassword);
    }

    async userIsExist(email: string) {
        return await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
    }

    createJwtToken(user: UserJwtType): string{
        return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '1h' });
    }

    restructureUser(user: User | null): SecureUser | null {
        if (!user) return null;
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}