/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ForunsService } from './service';
import { CreateForunDto } from './dto/create.dto';
import { UpdateForunDto } from './dto/update.dto';
import { ApiTags } from '@nestjs/swagger';
import { TopicsService } from 'src/topics/service';
import { UsersService } from 'src/users/model.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/decorators/roles.decoratos';

@Controller('foruns')
@ApiTags('forums')
export class ForunsController {
    constructor(
        private readonly forunsService: ForunsService,
        private readonly topicsService: TopicsService,
        private readonly usersService: UsersService,
    ) { }

    @Get('counts')
    async getCountForuns() {
        return {
            topics: await this.topicsService.count(),
            foruns: await this.forunsService.count(),
            users: await this.usersService.count(),
            comments: 0,
            tags: 0,
        }
    }

    @Post()
    // @UseGuards(AuthGuard)
    // @Roles('canComment')
    create(@Body() createForunDto: CreateForunDto) {
        return this.forunsService.create(createForunDto);
    }

    @Get()
    findAll() {
        return this.forunsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.forunsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateForunDto: UpdateForunDto) {
        return this.forunsService.update(+id, updateForunDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.forunsService.remove(+id);
    }
}
