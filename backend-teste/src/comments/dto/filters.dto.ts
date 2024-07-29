/* eslint-disable prettier/prettier */

import { ApiPropertyOptional } from "@nestjs/swagger";


export class FiltersInclude {
    @ApiPropertyOptional({ description: 'Include author details', example: true })
    hasAuthor?: boolean;
    @ApiPropertyOptional({ description: 'Include author details', example: true })
    hasForum?: boolean;
    @ApiPropertyOptional({ description: 'Include author details', example: true })
    hasTopic?: boolean;
}