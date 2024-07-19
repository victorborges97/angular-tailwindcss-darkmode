/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './model.service';
import { UsersController } from './model.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService],
    imports: []
})
export class UsersModule { }
