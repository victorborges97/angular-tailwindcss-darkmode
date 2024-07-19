/* eslint-disable prettier/prettier */
import { User as ModelPrisma } from "@prisma/client"

export class User implements ModelPrisma {
    password: string;
    id: number;
    name: string;
    imageUrl: string;
    usuario: string;
    email: string;
}
