import {ApiProperty} from "@nestjs/swagger";

export class ReqDto{
    @ApiProperty({
        description: "search val",
        default: 'hau'
    })
    textSearch: string;
}