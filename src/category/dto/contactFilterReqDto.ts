import {ApiProperty} from "@nestjs/swagger";

export class contactFilterReqDto{
    @ApiProperty({
        description: "search val",
        default: 'lop sc1'
    })
    textSearch: string;
}