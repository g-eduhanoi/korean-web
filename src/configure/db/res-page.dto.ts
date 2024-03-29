import { ApiProperty } from "@nestjs/swagger";

export class ResPageDto<T> {
    @ApiProperty({description: "array of item", default: []})
    content: T[];

    @ApiProperty({description: "total item in db", default: 0})
    totalElements: number;

    @ApiProperty({description: "total page in db follow by req size", default: 0})
    totalPages: number;

    @ApiProperty({description: "total items in content array", default: 0})
    numberOfElements: number;

    @ApiProperty({description: "current page", default: 0})
    number: number;

    @ApiProperty({description: "is first page", default: false})
    isFirst: boolean;

    @ApiProperty({description: "is last page", default: false})
    isLast: boolean;

}