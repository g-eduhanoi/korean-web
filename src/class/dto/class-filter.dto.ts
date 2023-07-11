import { ApiProperty } from "@nestjs/swagger";

export class ClassFilterReqDto{

    @ApiProperty({
        description: "Category id",
        default: 1
    })
    categoryId: number;

    @ApiProperty({
        description: "search val",
        default: 'lop sc1'
    })
    q: string;
}