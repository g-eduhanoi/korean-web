import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {

    @ApiProperty({
        default: 'Category name',
    })
    name: string;

}
