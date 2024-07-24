/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CommentCreateDto } from './create.dto';

export class CommentUpdateDto extends PartialType(CommentCreateDto) { }
