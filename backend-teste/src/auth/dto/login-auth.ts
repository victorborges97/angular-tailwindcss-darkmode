/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty()
    password: string;
    @ApiProperty()
    identifier: string;
}
