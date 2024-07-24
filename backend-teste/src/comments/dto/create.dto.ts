/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional, ApiHideProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client"

export class CommentCreateDto implements Prisma.CommentCreateManyInput {

    @ApiPropertyOptional()
    id?: string;
    @ApiProperty()
    content: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    @ApiProperty()
    authorId: number;

    @ApiHideProperty()
    forumId: number;

    @ApiProperty()
    topicId: number;
}

