/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { TopicCreateDto } from './dto/create.dto';
import { TopicUpdateDto } from './dto/update.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TopicsService {
    constructor(private prisma: PrismaService) { }
    async create(createForumDto: TopicCreateDto) {
        const modelExist = await this.prisma.topic.findFirst({
            where: {
                slug: createForumDto.slug,
            }
        });
        if (modelExist) throw new ForbiddenException("Topic existente!");
        return await this.prisma.topic.create({
            data: createForumDto,
            select: {
                id: true,
                slug: true,
                title: true,
                forum: {
                    select: {
                        name: true,
                        id: true,
                        imageUrl: true,
                    }
                },
                createdAt: true,
                author: {
                    select: {
                        imageUrl: true,
                        name: true,
                        id: true,
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        userStarsTopic: true,
                    }
                }
            },
        });
    }

    async findAllSearch(search: string) {
        return await this.prisma.topic.findMany({
            where: {
                title: {
                    contains: search,
                },
                content: {
                    contains: search,
                },
                tags: {
                    some: {
                        name: {
                            contains: search,
                        },
                    }
                }
            },
            select: {
                id: true,
                slug: true,
                title: true,
                forum: {
                    select: {
                        name: true,
                        id: true,
                        imageUrl: true,
                    }
                },
                createdAt: true,
                author: {
                    select: {
                        imageUrl: true,
                        name: true,
                        id: true,
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        userStarsTopic: true,
                    }
                }
            }
        });
    }

    async findRecents(quantity: number) {
        return await this.prisma.topic.findMany({
            select: {
                id: true,
                slug: true,
                title: true,
                forumId: true,
            },
            orderBy: {
                createdAt: 'desc', // Ordena pelos mais recentes, assumindo que você tem um campo createdAt
            },
            take: quantity, // Limita a quantidade de resultados
        });
    }

    async findAllByForumId(forumId: string) {
        return await this.prisma.topic.findMany({
            where: {
                forumId: Number(forumId),
            },
            select: {
                id: true,
                slug: true,
                title: true,
                forum: {
                    select: {
                        name: true,
                        id: true,
                        imageUrl: true,
                    }
                },
                createdAt: true,
                author: {
                    select: {
                        imageUrl: true,
                        name: true,
                        id: true,
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        userStarsTopic: true,
                    }
                }
            }
        });
    }

    async findAllByTag(tag: string) {
        return await this.prisma.topic.findMany({
            where: {
                tags: {
                    every: {
                        tag
                    }
                },
            },
            select: {
                id: true,
                slug: true,
                title: true,
                forum: {
                    select: {
                        name: true,
                        id: true,
                        imageUrl: true,
                    }
                },
                createdAt: true,
                author: {
                    select: {
                        imageUrl: true,
                        name: true,
                        id: true,
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        userStarsTopic: true,
                    }
                }
            }
        });
    }

    async count() {
        try {
            return await this.prisma.topic.count();
        } catch (e) {
            console.log("error count: " + e);
            return 0;
        }
    }

    async findOne(id: number) {
        return await this.prisma.topic.findUniqueOrThrow({
            where: { id }, select: {
                id: true,
                slug: true,
                title: true,
                forum: {
                    select: {
                        name: true,
                        id: true,
                        imageUrl: true,
                    }
                },
                createdAt: true,
                author: {
                    select: {
                        imageUrl: true,
                        name: true,
                        id: true,
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        userStarsTopic: true,
                    }
                }
            }
        });
    }

    async findBySlug(slug: string) {
        return await this.prisma.topic.findUniqueOrThrow({
            where: { slug }, select: {
                id: true,
                slug: true,
                title: true,
                forum: {
                    select: {
                        name: true,
                        id: true,
                        imageUrl: true,
                    }
                },
                createdAt: true,
                author: {
                    select: {
                        imageUrl: true,
                        name: true,
                        id: true,
                    }
                },
                comments: {
                    select: {
                        author: {
                            select: {
                                imageUrl: true,
                                name: true,
                                id: true,
                            }
                        },
                        content: true,
                        createdAt: true,
                        id: true,
                        forum: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true,
                            }
                        },
                    }
                },
                content: true,
                tags: true,
            }
        });
    }

    async update(id: number, updateDto: TopicUpdateDto) {
        const modelExist = await this.prisma.topic.findUnique({
            where: {
                id,
            }
        });
        if (!modelExist) throw new ForbiddenException("Topico inválido!");
        return await this.prisma.topic.update({
            data: updateDto,
            where: {
                id,
            },
            select: {
                id: true,
                slug: true,
                title: true,
                forum: {
                    select: {
                        name: true,
                        id: true,
                        imageUrl: true,
                    }
                },
                createdAt: true,
                author: {
                    select: {
                        imageUrl: true,
                        name: true,
                        id: true,
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        userStarsTopic: true,
                    }
                }
            }
        });
    }

    async remove(id: number) {
        const modelExist = await this.prisma.topic.findUnique({
            where: {
                id,
            }
        });
        if (!modelExist) throw new ForbiddenException("Topico inválido!");
        return await this.prisma.topic.delete({
            where: {
                id,
            },
        });
    }
}
