import { Category } from "category/entities/category.entity";
import { Post } from "post/entities/post.entity";
import { Tag } from "tag/entities/tag.entity";

export class ResPostDto {
    title: string;
    excerpt: string;
    slug: string;
    status: string;
    viewCount: number;
    thumbnail: string;
    category: Category;
    tags: Tag[];

    static async fromPost(post: Post): Promise<ResPostDto> {
        const res = new ResPostDto();
        res.title = post.title;
        res.excerpt = post.excerpt;
        res.slug = post.slug;
        res.status = post.status;
        res.viewCount = post.viewCount;
        res.thumbnail = post.thumbnail;
        res.category = await post.$get("category");
        res.tags = await post.$get("tags");
        return res;
    }
}
