/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ForunsService } from './service';
import { ForunsController } from './controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TopicsService } from 'src/topics/service';
import { UsersService } from 'src/users/model.service';

@Module({
    controllers: [ForunsController],
    providers: [ForunsService, PrismaService, TopicsService, UsersService],
    imports: []
})
export class ForunsModule { }
