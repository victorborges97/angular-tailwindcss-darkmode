/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma } from "@prisma/client"

export class CreateForunDto implements Prisma.ForumCreateManyInput {
    @ApiProperty()
    name: string;
    @ApiPropertyOptional()
    imageUrl?: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    userId: number;
    id?: number;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

