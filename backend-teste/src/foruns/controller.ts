/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForunsService } from './service';
import { CreateForunDto } from './dto/create.dto';
import { UpdateForunDto } from './dto/update.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('foruns')
@ApiTags('forums')
export class ForunsController {
    constructor(private readonly forunsService: ForunsService) { }

    @Post()
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
