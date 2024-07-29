/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CommentCreateDto } from './dto/create.dto';
import { CommentUpdateDto } from './dto/update.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FiltersInclude } from './dto/filters.dto';

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) { }
    async create(createForumDto: CommentCreateDto, filtersInclude: FiltersInclude) {

        const topicModel = await this.prisma.topic.findUnique({
            where: { id: createForumDto.topicId }
        });

        if (!topicModel) throw new ForbiddenException("Commentário inválido!");

        createForumDto.forumId = topicModel.forumId;

        const author = filtersInclude.hasAuthor ? {
            select: {
                imageUrl: true,
                name: true,
                id: true,
            }
        } : undefined;

        const forum = filtersInclude.hasForum ? {
            select: {
                id: true,
                name: true,
                imageUrl: true,
            }
        } : undefined;

        const topic = filtersInclude.hasForum ? {
            select: {
                id: true,
                title: true,
                slug: true,
            }
        } : undefined;
        return await this.prisma.comment.create({
            data: createForumDto,
            select: {
                id: true,
                content: true,
                updatedAt: true,
                createdAt: true,
                author,
                forum,
                topic
            },
        });
    }

    async findAllByTopicIdPaginated(topicId: string, filtersInclude: FiltersInclude, page: number, pageSize: number) {
        const author = filtersInclude.hasAuthor ? {
            select: {
                imageUrl: true,
                name: true,
                id: true,
            }
        } : undefined;

        const forum = filtersInclude.hasForum ? {
            select: {
                id: true,
                name: true,
                imageUrl: true,
            }
        } : undefined;

        const topic = filtersInclude.hasForum ? {
            select: {
                id: true,
                title: true,
                slug: true,
            }
        } : undefined;

        const skip = ((page ?? 1) - 1) * (pageSize ?? 10);
        const take = (pageSize ?? 10);

        const totalCount = await this.prisma.comment.count({
            where: {
                topicId: Number(topicId),
            },
        });

        const comments = await this.prisma.comment.findMany({
            where: {
                topicId: Number(topicId),
            },
            select: {
                id: true,
                content: true,
                updatedAt: true,
                createdAt: true,
                author,
                forum,
                topic,
            },
            skip,
            take,
        });

        return {
            data: comments,
            pagination: {
                totalItems: totalCount,
                currentPage: (page ?? 1),
                pageSize: (pageSize ?? 10),
                totalPages: Math.ceil(totalCount / (pageSize ?? 10)),
            },
        }
    }

    async findAllByTopicId(topicId: string, filtersInclude: FiltersInclude) {
        const author = filtersInclude.hasAuthor ? {
            select: {
                imageUrl: true,
                name: true,
                id: true,
            }
        } : undefined;

        const forum = filtersInclude.hasForum ? {
            select: {
                id: true,
                name: true,
                imageUrl: true,
            }
        } : undefined;

        const topic = filtersInclude.hasForum ? {
            select: {
                id: true,
                title: true,
                slug: true,
            }
        } : undefined;

        return await this.prisma.comment.findMany({
            where: {
                topicId: Number(topicId),
            },
            select: {
                id: true,
                content: true,
                updatedAt: true,
                createdAt: true,
                author,
                forum,
                topic,
            },
        });
    }

    async count() {
        try {
            return await this.prisma.comment.count();
        } catch (e) {
            console.log("error count: " + e);
            return 0;
        }
    }

    async update(id: string, updateDto: CommentUpdateDto, filtersInclude: FiltersInclude) {
        const modelExist = await this.prisma.comment.findUnique({
            where: {
                id,
            }
        });
        if (!modelExist) throw new ForbiddenException("Commentário inválido!");
        const author = filtersInclude.hasAuthor ? {
            select: {
                imageUrl: true,
                name: true,
                id: true,
            }
        } : undefined;
        const forum = filtersInclude.hasForum ? {
            select: {
                id: true,
                name: true,
                imageUrl: true,
            }
        } : undefined;
        const topic = filtersInclude.hasForum ? {
            select: {
                id: true,
                title: true,
                slug: true,
            }
        } : undefined;
        return await this.prisma.comment.update({
            data: updateDto,
            where: {
                id,
            },
            select: {
                id: true,
                content: true,
                updatedAt: true,
                createdAt: true,
                author,
                forum,
                topic,
            }
        });
    }

    async remove(id: string) {
        const modelExist = await this.prisma.comment.findUnique({
            where: {
                id,
            }
        });
        if (!modelExist) throw new ForbiddenException("Comentário inválido!");
        return await this.prisma.comment.delete({
            where: {
                id,
            },
        });
    }
}
