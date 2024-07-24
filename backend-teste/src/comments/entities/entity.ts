/* eslint-disable prettier/prettier */
import { Comment as ModelPrisma } from "@prisma/client"

export class Comment implements ModelPrisma {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    forumId: number;
    topicId: number;
}
