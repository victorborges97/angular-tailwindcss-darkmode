/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma } from "@prisma/client"

export class CreateUserDto implements Prisma.UserCreateManyInput {
    @ApiProperty()
    password: string;
    @ApiPropertyOptional()
    id?: number;
    @ApiProperty()
    name: string;
    @ApiPropertyOptional()
    imageUrl?: string;
    @ApiProperty()
    usuario: string;
    @ApiProperty()
    email: string;
}
