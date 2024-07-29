/* eslint-disable prettier/prettier */
import { User as ModelPrisma } from "@prisma/client"

export class User implements ModelPrisma {
    role: string;
    createdAt: Date;
    updatedAt: Date;
    password: string;
    id: number;
    name: string;
    imageUrl: string;
    usuario: string;
    email: string;
}
