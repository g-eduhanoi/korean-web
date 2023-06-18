import { ApiProperty } from "@nestjs/swagger";
import { Category } from "category/entities/category.entity";
import { Tag } from "tag/entities/tag.entity";

export class CreatePostDto {

    @ApiProperty({
        default: "This is a title",
    })
    title: string;
    
    @ApiProperty({
        default: "This is a content",
    })
    content: string;
    
    @ApiProperty({
        default: "This is a content",
    })
    excerpt: string;

    @ApiProperty({
        default: "This is a content",
    })
    slug: string;

    @ApiProperty({
        default: "This is a content",
    })
    status: string;

    @ApiProperty({
        default: 50,
    })
    viewCount: number;

    @ApiProperty({
        default: "This is a content",
    })
    thumbnail: string;

    @ApiProperty({
        default: 1,
    })
    categoryId: number;

    @ApiProperty({
        default: [1],
    })
    tagIds: number[];

    loggedUserId: number;

    category: Category | null;
    tags: Tag[] | null;
}
