import { ApiProperty } from "@nestjs/swagger";
import { PostLocaleType } from "post/entities/post.entity";

export class PostFilterReqDto {
    @ApiProperty({
        description: 'category id',
        default: 1
    })
    categoryId?: string | number;

    @ApiProperty({
        description: 'key search',
        default: 'post mm'
    })
    q?: string;

    postLocale: PostLocaleType;
}