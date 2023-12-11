import { Category } from "category/entities/category.entity";
import { Post } from "post/entities/post.entity";
import { Tag } from "tag/entities/tag.entity";

export class ResPostDto {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    status: string;
    viewCount: number;
    thumbnail: string;
    imageCaption: string;
    category: Category;
    tags: Tag[];
    createdAt: Date;
    updatedAt: Date;
    postParent?: number;
    postLocale: string;
    postEn?: ResPostDto;
    postKo?: ResPostDto;

    static async fromPost(post: Post): Promise<ResPostDto> {
        if(!post) return null;
        const res = new ResPostDto();
        res.id = post.id;
        res.title = post.title;
        // res.content = post.content;
        res.excerpt = post.excerpt;
        res.slug = post.slug;
        res.status = post.status;
        res.viewCount = post.viewCount;
        res.thumbnail = post.thumbnail;
        res.imageCaption = post.imageCaption;
        res.category = await post.$get("category");
        res.tags = await post.$get("tags");
        res.createdAt = post.createdAt;
        res.updatedAt = post.updatedAt;
        return res;
    }
}
