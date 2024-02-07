import {ApiProperty} from "@nestjs/swagger";
import {TagDto} from "./TagDto";
import {Tag} from "../../tag/entities/tag.entity";
export class CreateContactDto {
    @ApiProperty({
        default: 'fullName',
    })
    fullName: string;

    @ApiProperty({
        default: 'email',
    })
    email: string;

    @ApiProperty({
        default: 'phone',
    })
    phone: string;
    @ApiProperty({
        default: 'content',
    })
    content: string;

    @ApiProperty({
        type: [TagDto],
        default: [{id:1,name:2}],
    })
    tagDtos: TagDto[] | null;

    @ApiProperty({
        type: [],
        default: ["aaa","asdsds"],
    })
    tags: string[] | null;
}
