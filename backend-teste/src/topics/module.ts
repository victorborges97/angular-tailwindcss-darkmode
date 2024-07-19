/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TopicsService } from './service';
import { TopicsController } from './controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [TopicsController],
    providers: [TopicsService, PrismaService],
    imports: []
})
export class TopicsModule { }
