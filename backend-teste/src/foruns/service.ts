/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateForunDto } from './dto/create.dto';
import { UpdateForunDto } from './dto/update.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ForunsService {
    constructor(private prisma: PrismaService) { }
    async create(createForumDto: CreateForunDto) {
        const modelExist = await this.prisma.forum.findFirst({
            where: {
                name: createForumDto.name,
            }
        });
        if (modelExist) throw new ForbiddenException("Usuário inválido!");
        return await this.prisma.forum.create({
            data: createForumDto,
            select: {
                id: true,
                imageUrl: true,
                name: true,
                description: true,
                createdAt: true,
                user: true,
                topics: {
                    select: {
                        _count: true,
                    }
                },
            },
        });
    }

    async findAll() {
        return await this.prisma.forum.findMany({
            select: {
                id: true,
                imageUrl: true,
                name: true,
                description: true,
                createdAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                    }
                },
                topics: {
                    select: {
                        _count: true,
                    }
                },
            }
        });
    }

    async findOne(id: number) {
        return await this.prisma.forum.findUniqueOrThrow({
            where: { id }, select: {
                id: true,
                imageUrl: true,
                name: true,
                description: true,
                createdAt: true,
                user: true,
            }
        });
    }

    async update(id: number, updateForumDto: UpdateForunDto) {
        const modelExist = await this.prisma.forum.findUnique({
            where: {
                id,
            }
        });
        if (!modelExist) throw new ForbiddenException("Forum inválido!");
        return await this.prisma.forum.update({
            data: updateForumDto,
            where: {
                id,
            },
        });
    }

    async remove(id: number) {
        const modelExist = await this.prisma.forum.findUnique({
            where: {
                id,
            }
        });
        if (!modelExist) throw new ForbiddenException("Forum inválido!");
        return await this.prisma.forum.delete({
            where: {
                id,
            },
        });
    }

    async count() {
        return await this.prisma.forum.count();
    }
}
