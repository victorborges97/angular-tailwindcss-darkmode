/* eslint-disable prettier/prettier */
import { Forum as ModelPrisma } from "@prisma/client"

export class Forum implements ModelPrisma {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}
