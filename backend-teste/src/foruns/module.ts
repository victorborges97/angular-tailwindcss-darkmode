/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ForunsService } from './service';
import { ForunsController } from './controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [ForunsController],
    providers: [ForunsService, PrismaService],
    imports: []
})
export class ForunsModule { }
