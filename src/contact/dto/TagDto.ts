import {ApiProperty} from "@nestjs/swagger";
import {Tag} from "../../tag/entities/tag.entity";

export class TagDto {

    @ApiProperty({
        default: 'hhaa',
    })
    name: string;

    @ApiProperty({
        default: '1',
    })
    id: number;

    @ApiProperty({
        default: '1',
    })
    contactId: number;
}