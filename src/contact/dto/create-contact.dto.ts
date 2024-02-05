import {ApiProperty} from "@nestjs/swagger";

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
}
