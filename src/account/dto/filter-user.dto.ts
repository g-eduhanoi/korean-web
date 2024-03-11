import {ApiProperty} from "@nestjs/swagger";

export class FilterUserDto{
    @ApiProperty({
        description: "search val",
        default: 'lop sc1'
    })
    q: string;
}