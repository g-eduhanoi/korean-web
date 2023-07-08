import { ApiProperty } from "@nestjs/swagger";

export class ClassFilterReqDto{

    @ApiProperty({
        description: "Category id",
        default: 1
    })
    categoryId: number;
}