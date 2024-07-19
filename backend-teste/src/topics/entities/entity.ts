/* eslint-disable prettier/prettier */
import { Topic as ModelPrisma } from "@prisma/client"

export class Topic implements ModelPrisma {
    id: number;
    title: string;
    slug: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    views: number;
    forumId: number;
    authorId: number;
}
