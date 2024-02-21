
import {ApiProperty} from "@nestjs/swagger";

export class CreateTeacherDto {
    @ApiProperty({
        default: 'id',
    })
    id?: number | null;
    @ApiProperty({
        default: 'name',
    })
    name: string;
    @ApiProperty({
        default: 'phone',
    })
    phone: string;
    @ApiProperty({
        default: 'email',
    })
    email: string;
    @ApiProperty({
        default: 'qualification',
    })
    qualification : string;
    @ApiProperty({
        default: 'teachingExperience',
    })
    teachingExperience : string;
    @ApiProperty({
        default: 'avatar',
    })
    avatar : string;
}
