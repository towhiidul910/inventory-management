import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (rec: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.users.findMany();
        res.json(users)
    } catch (error) {
        res.status(500).json({ massage: "Error retrieving users"})
    }
}