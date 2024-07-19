/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma } from "@prisma/client"

export class TopicCreateDto implements Prisma.TopicCreateManyInput {
    @ApiPropertyOptional()
    id?: number;
    @ApiProperty()
    slug: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    content: string;
    @ApiProperty()
    forumId: number;
    @ApiProperty()
    authorId: number;
}

