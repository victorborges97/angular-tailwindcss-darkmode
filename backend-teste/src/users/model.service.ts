/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    async count() {
        return await this.prisma.user.count().catch(() => 0);
    }

    async create(createUserDto: CreateUserDto) {
        const userExist = await this.prisma.user.findUnique({
            where: {
                usuario: createUserDto.usuario,
            }
        });
        if (userExist) throw new ForbiddenException("Usuário inválido!");
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // Hash da senha com salt de 10 rounds
        return await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                name: createUserDto.name,
                imageUrl: createUserDto.imageUrl,
                usuario: createUserDto.usuario,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                usuario: true,
                email: true,
            },
        });
    }

    async findAll() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                imageUrl: true,
                usuario: true,
                email: true,
            }
        });
    }

    async findOne(id: number) {
        return await this.prisma.user.findUniqueOrThrow({
            where: { id }, select: {
                id: true,
                name: true,
                imageUrl: true,
                usuario: true,
                email: true,
                createdAt: true,
                _count: {
                    select: {
                        topics: true,
                        Comment: true,
                    }
                }
            }
        });
    }

    async findUsuario(usuario: string) {
        return await this.prisma.user.findUnique({
            where: { usuario },
        });
    }

    async findEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: { email },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const userExist = await this.prisma.user.findUnique({
            where: {
                id,
            }
        });
        if (!userExist) throw new ForbiddenException("Usuário inválido!");
        return await this.prisma.user.update({
            data: updateUserDto,
            where: {
                id,
            },
        });
    }

    async remove(id: number) {
        const userExist = await this.prisma.user.findUnique({
            where: {
                id,
            }
        });
        if (!userExist) throw new ForbiddenException("Usuário inválido!");
        return await this.prisma.user.delete({
            where: {
                id,
            },
        });
    }

    async validateUser(identifier: string, password: string): Promise<User | null> {
        const user = identifier.includes('@')
            ? await this.findEmail(identifier)
            : await this.findUsuario(identifier);
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return null;
        }
        delete user.password;
        return user;
    }
}
