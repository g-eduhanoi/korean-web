import {ApiProperty} from "@nestjs/swagger";

export class TagClassDto{
    @ApiProperty({
        type: [],
        default: ["aaa","asdsds"],
    })
    tags: string[] | null;
}