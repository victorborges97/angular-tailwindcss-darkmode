/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateForunDto } from './create.dto';

export class UpdateForunDto extends PartialType(CreateForunDto) { }
