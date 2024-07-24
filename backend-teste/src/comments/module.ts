/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentsService } from './service';
import { CommentsController } from './controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [CommentsController],
    providers: [CommentsService, PrismaService],
    imports: []
})
export class CommentsModule { }
