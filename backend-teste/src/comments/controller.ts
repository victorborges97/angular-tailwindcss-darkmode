/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './service';
import { CommentCreateDto } from './dto/create.dto';
import { CommentUpdateDto } from './dto/update.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FiltersInclude } from './dto/filters.dto';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
    constructor(private readonly service: CommentsService) { }

    @Post()
    create(@Body() createDto: CommentCreateDto, @Param() filtersInclude: FiltersInclude) {
        return this.service.create(createDto, filtersInclude);
    }

    @Get()
    findAllByTopic(@Param('topicId') topicId: string, @Param() filtersInclude: FiltersInclude) {
        return this.service.findAllByTopicId(topicId, filtersInclude);
    }

    @Get('topic/:topicId')
    @ApiParam({ name: 'topicId', type: String, description: 'ID of the topic' })
    @ApiQuery({ name: 'hasAuthor', type: Boolean, required: false, description: 'Include author details' })
    @ApiQuery({ name: 'hasForum', type: Boolean, required: false, description: 'Include forum details' })
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number', example: 1 })
    @ApiQuery({ name: 'pageSize', type: Number, required: false, description: 'Number of items per page', example: 10 })
    async findAllByTopicId(
        @Param('topicId') topicId: string,
        @Query() filtersInclude: FiltersInclude,
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
    ) {
        return this.service.findAllByTopicIdPaginated(topicId, filtersInclude, Number(page), Number(pageSize));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: CommentUpdateDto, @Param() filtersInclude: FiltersInclude) {
        return this.service.update(id, updateDto, filtersInclude);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
