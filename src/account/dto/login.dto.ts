import {ApiProperty} from "@nestjs/swagger";

export class LoginDto{
    @ApiProperty({
      default: 'hau',
    })
    username: string;
    @ApiProperty({
        default: 'hau',
    })
    password: string;
}