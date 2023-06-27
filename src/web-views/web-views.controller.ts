import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class WebViewsController {

    @Get('chuyen-nganh-hoc')
    @Render('posts/post_list_page')
    majorPage(): object {
        return {
            title: 'Chuyên ngành học',
        }
    }

    @Get('hoc-tieng-han')
    @Render('posts/post_list_page')
    koreanLearningPage(): object {
        return {
            title: 'Học tiếng Hàn',
        }
    }


    @Get('hieu-ve-han-quoc')
    @Render('posts/post_list_page')
    knownAboutKoreaPage(): object {
        return {
            title: 'Hiểu về Hàn Quốc',
        }
    }

    @Get('cong-dong-du-hoc')
    @Render('posts/post_list_page')
    communityPage(): object {
        return {
            title: 'Cộng đồng du học',
        }
    }


    @Get('khoa-hoc-tieng')
    @Render('posts/post_list_page')
    normalCoursePage(): object {
        return {
            title: 'Khóa học tiếng Hàn Sơ-Trung-Cao cấp',
        }
    }

    @Get('khoa-hoc-topik')
    @Render('posts/post_list_page')
    topikCoursePage(): object {
        return {
            title: 'Khóa học tiếng Hàn Topik',
        }
    }

    @Get('khoa-hoc-opic')
    @Render('posts/post_list_page')
    opicCoursePage(): object {
        return {
            title: 'Khóa học tiếng Hàn Opic',
        }
    }



    @Get('su-kien')
    @Render('posts/post_list_page')
    eventPage(): object {
        return {
            title: 'Khách mời - Thuyết giảng',
        }
    }


    @Get('co-van-hoc-tap')
    @Render('posts/post_list_page')
    mentorPage(): object {
        return {
            title: 'Cố vấn học tập',
        }
    }


    @Get('workshop')
    @Render('posts/post_list_page')
    workshopPage(): object {
        return {
            title: 'Workshop',
        }
    }

    
}
