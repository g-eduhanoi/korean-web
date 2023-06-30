import { PostService } from './../post/post.service';
import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class WebViewsController {

    constructor(private readonly postService: PostService ){}

    @Get('chuyen-nganh-hoc')
    @Render('posts/post_list_page')
    async majorPage(): Promise<object> {
        return {...await this.filterPost(2), title: 'Chuyên ngành học'};
    }

    async filterPost(categoryId: number) {
        const latestPosts = await this.postService.filter({
            categoryId
        }, {
            page: 0, size: 3
        });


        const pageDto = await this.postService.filter({
            categoryId: 2
        }, {
            page: 0, size: 12
        });
        pageDto.content = pageDto.content.slice(2);

        const firstPost = latestPosts.content[0];
        latestPosts.content =  latestPosts.content.slice(1);

        
        let pageList = Array.from({length: pageDto.totalPages}).map((_, i) => i + 1);

        
        return {
            firstPost,
            latestPosts: latestPosts.content,
            recentPostPage: pageDto,
            pageList,
        }
    }

    @Get('thong-tin-hoc-bong')
    @Render('posts/post_list_page')
    async scholarshipInfo(): Promise<object> {
        return {...await this.filterPost(3), title: 'Thông tin học bổng'};
    }



    @Get('hieu-ve-han-quoc')
    @Render('posts/post_list_page')
    async knownAboutKoreaPage(): Promise<object> {
        return {
            ...await this.filterPost(4),
            title: 'Hiểu về Hàn Quốc',
        }
    }

    @Get('cong-dong-du-hoc')
    @Render('posts/post_list_page')
    async communityPage(): Promise<object> {
        return {
            ...await this.filterPost(5),
            title: 'Cộng đồng du học',
        }
    }


    // @Get('hoc-tieng-han')
    // @Render('posts/post_list_page')
    // async koreanLearningPage(): Promise<object> {
    //     return await this.filterPost(2);
    // }

    @Get('khoa-hoc-tieng')
    @Render('posts/post_list_page')
    async normalCoursePage(): Promise<object> {
        return {
            ...await this.filterPost(6),
            title: 'Khóa học tiếng Hàn Sơ-Trung-Cao cấp',
        }
    }

    @Get('khoa-hoc-topik')
    @Render('posts/post_list_page')
    async topikCoursePage(): Promise<object> {
        return {
            ...await this.filterPost(7),
            title: 'Khóa học tiếng Hàn Topik',
        }
    }

    @Get('khoa-hoc-opic')
    @Render('posts/post_list_page')
    async opicCoursePage(): Promise<object> {
        return {
            ...await this.filterPost(8),
            title: 'Khóa học tiếng Hàn Opic',
        }
    }



    @Get('su-kien')
    @Render('posts/post_list_page')
    async eventPage(): Promise<object> {
        return {
            ...await this.filterPost(9),
            title: 'Khách mời - Thuyết giảng',
        }
    }


    @Get('co-van-hoc-tap')
    @Render('posts/post_list_page')
    async mentorPage(): Promise<object> {

        return {
            ...await this.filterPost(10),
            title: 'Cố vấn học tập',
        }
    }


    @Get('workshop')
    @Render('posts/post_list_page')
    async workshopPage(): Promise<object> {
        return {
            ...await this.filterPost(11),
            title: 'Workshop',
        }
    }


    @Get('mang-xa-hoi')
    @Render('introduction/sns_page')
    async snsPage(): Promise<object> {
        return {
            ...await this.filterPost(12),
            title: 'G-EDU - Mạng xã hội',
        }
    }


    @Get('ve-chung-toi')
    @Render('introduction/about')
    async aboutPage(): Promise<object> {

        return {
            ...await this.filterPost(12),
            title: 'Về chúng tôi',
        }
    }

    
}