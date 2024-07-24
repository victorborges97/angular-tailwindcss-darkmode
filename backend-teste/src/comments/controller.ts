/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './service';
import { CommentCreateDto } from './dto/create.dto';
import { CommentUpdateDto } from './dto/update.dto';
import { ApiTags } from '@nestjs/swagger';
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
    findAllByTopic(@Param() filtersInclude: FiltersInclude) {
        return this.service.findAllByTopicId(filtersInclude.topicId, filtersInclude);
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
