/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { TopicCreateDto } from './create.dto';

export class TopicUpdateDto extends PartialType(TopicCreateDto) { }
