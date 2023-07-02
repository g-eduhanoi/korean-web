import { Category } from 'category/entities/category.entity';
import { BelongsTo, BelongsToMany, Column, ForeignKey, Index, Model, Table } from 'sequelize-typescript';
import { Tag } from 'tag/entities/tag.entity';

@Table({ tableName: 'tbl_posts' })
export class Post extends Model {
  @Index
  @Column
  title: string;

  @Column("LONGTEXT")
  content: string;

  @Column
  excerpt: string;

  @Column
  slug: string;

  @Column
  status: string;

  @Column
  viewCount: number;

  @Column
  thumbnail: string;

  @Column
  imageCaption: string;

  @BelongsTo(() => Category, "categoryId")
  category: Category;

  @Column
  createdBy: number;

  @Column

  updatedBy: number;

  @BelongsToMany(() => Tag, () => PostTag)
  tags: Tag[];

}

@Table({ tableName: 'tbl_post_tags' })
export class PostTag extends Model {
  @ForeignKey(() => Post)
  @Column
  postId: number;

  @ForeignKey(() => Tag)
  @Column
  tagId: number;
}

export const PostProviders = [
  {
    provide: 'POST_REPO',
    useValue: Post,
  },
  {
    provide: 'POST_TAG_REPO',
    useValue: PostTag,
  }
];