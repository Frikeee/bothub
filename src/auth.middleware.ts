import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {NextFunction, Request, Response} from "express";
import * as process from "node:process";
import {UserJwtType} from "@/types/user-jwt.type";

dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!isValidToken(req, res)) {
            return;
        }
        next();
    } catch (e) {
        res.status(400).json({message: 'Invalid token'});
        return;
    }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const decode = isValidToken(req, res);
        if (!decode || decode.role !== 'admin') {
            res.status(403).json({message: 'Access denied. You are not an admin.'});
            return;
        }
        next();
    } catch (e) {
        res.status(401).json({message: 'Token is corrupted'});
    }
}

export const isValidToken = (req: Request, res: Response) => {
    const authToken = req.headers['authorization']?.replace('Bearer ', '');
    if (!authToken) {
        res.status(401).json({message: 'Not authorized'});
        return;
    }
    return jwt.verify(authToken, process.env.JWT_SECRET!) as UserJwtType;
}