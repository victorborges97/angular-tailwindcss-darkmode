/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/model.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [UsersService, PrismaService],
})
export class AuthModule { }
