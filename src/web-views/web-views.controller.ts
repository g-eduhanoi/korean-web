import { OptionService } from 'option/option.service';
import { PostService } from './../post/post.service';
import { Controller, Get, Render } from '@nestjs/common';
import createLocaleRoute from 'configure/utils/I18nRoute';
import { CategoryService } from 'category/category.service';
import { FileService } from 'file/file.service';
import { ResPageDto } from 'configure/db/res-page.dto';
import { FileEntity } from 'file/entities/file.entity';
import { Public } from 'auth/auth.guard';

@Controller("homepage")
export class WebViewsController {
    constructor(private readonly postService: PostService,
        private readonly optionService: OptionService,
        private readonly categoryService: CategoryService,
        private readonly fileService: FileService,
    ) { }

    @Get(['chuyen-nganh-hoc', ...createLocaleRoute(['major', 'chuyen-nganh-hoc'])])
    @Render('posts/post_list_page')
    async majorPage(): Promise<object> {

        return { ...await this.filterPost(2), title: 'Chuyên ngành học' };
    }

    async filterPost(categoryId: number) {
        const latestPosts = await this.postService.filter({
            categoryId,
            postLocale: "VI"
        }, {
            page: 0, size: 3
        });


        const pageDto = await this.postService.filter({
            categoryId,
            postLocale: "VI"
        }, {
            page: 0, size: 12
        });
        pageDto.content = pageDto.content.slice(2);

        const firstPost = latestPosts.content[0];
        latestPosts.content = latestPosts.content.slice(1);


        let pageList = Array.from({ length: pageDto.totalPages }).map((_, i) => i + 1);


        return {
            firstPost,
            latestPosts: latestPosts.content,
            recentPostPage: pageDto,
            pageList,
        }
    }

    @Get(['thong-tin-hoc-bong', ...createLocaleRoute(['scholarship', 'thong-tin-hoc-bong'])])
    @Render('posts/post_list_page')
    async scholarshipInfo(): Promise<object> {
        return { ...await this.filterPost(3), title: 'Thông tin học bổng' };
    }



    @Get(['hieu-ve-han-quoc', ...createLocaleRoute(['learn-about-korea', 'hieu-ve-han-quoc'])])
    @Render('posts/post_list_page')
    async knownAboutKoreaPage(): Promise<object> {
        return {
            ...await this.filterPost(4),
            title: 'Hiểu về Hàn Quốc',
        }
    }

    @Get(['cong-dong', ...createLocaleRoute(['community', 'cong-dong'])])
    @Render('posts/post_list_page')
    async communityPage(): Promise<object> {
        return {
            ...await this.filterPost(5),
            title: 'Cộng đồng du học',
        }
    }


    @Get(['hoc-tieng-han', ...createLocaleRoute(['learn-korean', 'hoc-tieng-han'])])
    @Render('posts/post_list_page')
    async koreanLearningPage(): Promise<object> {
        return {
            ...await this.filterPost(12),
            title: 'Học tiếng Hàn',
        }
    }

    @Get(['su-kien', ...createLocaleRoute(['event', 'su-kien'])])
    @Render('posts/post_list_page')
    async eventPage(): Promise<object> {
        return {
            ...await this.filterPost(9),
            title: 'Khách mời - Thuyết giảng',
        }
    }


    @Get(['co-van-hoc-tap', ...createLocaleRoute(['mentor', 'co-van-hoc-tap'])])
    @Render('posts/post_list_page')
    async mentorPage(): Promise<object> {

        return {
            ...await this.filterPost(10),
            title: 'Cố vấn học tập',
        }
    }


    @Get(['workshop', ...createLocaleRoute(['workshop'])])
    @Render('posts/post_list_page')
    async workshopPage(): Promise<object> {
        return {
            ...await this.filterPost(11),
            title: 'Workshop',
        }
    }

    @Get(['cau-lac-bo', ...createLocaleRoute(['club', 'cau-lac-bo'])])
    @Render('posts/post_list_page')
    async topikCoursePage(): Promise<object> {
        return {
            ...await this.filterPost(7),
            title: 'Câu lạc bộ',
        }
    }

    @Get(['thu-vien-nho', ...createLocaleRoute(['library', 'thu-vien-nho'])])
    @Render('posts/post_list_page')
    async opicCoursePage(): Promise<object> {
        return {
            ...await this.filterPost(8),
            title: 'Thư viện nhỏ',
        }
    }


    @Get(['mang-xa-hoi', ...createLocaleRoute(['social-network', 'mang-xa-hoi'])])
    @Render('introduction/sns_page')
    async snsPage(): Promise<object> {
        let pageContent = await this.optionService.getOptionByKey(`page_sns`);
        const pageData = JSON.parse(pageContent.optionValue);
        console.log(pageData);

        return {
            pageData,
            title: 'G-EDU - Mạng xã hội',
        }
    }

    @Get(['cac-chuyen-muc', ...createLocaleRoute(['blogs', 'cac-chuyen-muc'])])
    @Render('posts/blogs')
    async blogs() {
        const child1s = (await this.categoryService.findChilds(16))
            .map(async (item) => {
                return {
                    title: item.name,
                    slug: item.slug,
                    posts: (await this.postService.filter({
                        categoryId: item.id,
                        postLocale: "VI"
                    }, {
                        page: 0, size: 3,

                    })).content
                }
            });

        const pageData = {
            sectionData: await Promise.all(child1s)
        }

        pageData.sectionData.forEach(item => {
            console.log("post length: ", item.posts.length)
        })
        return pageData;
    }

    @Get(['ve-chung-toi', ...createLocaleRoute(['about_g-edu', 've-chung-toi'])])
    @Render('introduction/about')
    async aboutPage(): Promise<object> {
        let pageContent = await this.optionService.getOptionByKey(`page_introduction`);
        const pageData: {
            images: string[],
            content: string
        } = pageContent ? JSON.parse(pageContent.optionValue) : {
            images: [],
            content: ''
        };


        return {
            pageData,
            title: 'Về chúng tôi',
        }
    }


    @Public()
    // for apis
    @Get('gallery')
    async gallery(): Promise<ResPageDto<FileEntity>> {
        return await this.fileService.findAll({
            fileCode: "GALLERY"
        }, {
            page: 0,
            size: 18
        });
    }
}
