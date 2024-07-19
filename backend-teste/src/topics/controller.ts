/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TopicsService } from './service';
import { TopicCreateDto } from './dto/create.dto';
import { TopicUpdateDto } from './dto/update.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('topics')
@ApiTags('topics')
export class TopicsController {
    constructor(private readonly service: TopicsService) { }

    @Post()
    create(@Body() createDto: TopicCreateDto) {
        return this.service.create(createDto);
    }

    @Get()
    findAllFiltro(@Body() search: string) {
        return this.service.findAllSearch(search);
    }

    @Get('recents')
    findRecents(@Query('quantity') quantity: string) {
        return this.service.findRecents(Number(quantity));
    }

    @Get(':forumId')
    findAll(@Param('forumId') forumId: string) {
        return this.service.findAllByForumId(forumId);
    }

    @Get('slug/:slug')
    findBySlug(@Param('slug') slug: string) {
        return this.service.findBySlug(slug);
    }

    @Get('tag/:tag')
    findByTag(@Param('tag') tag: string) {
        return this.service.findAllByTag(tag);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: TopicUpdateDto) {
        return this.service.update(+id, updateDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}
