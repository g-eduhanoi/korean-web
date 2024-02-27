import {Column} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

export class CreateAccountDto {

    @ApiProperty({
        default: 'hau',
    })
    username: string | undefined
    @ApiProperty({
        default: 'hau21313',
    })
    password: string ;
    @ApiProperty({
        default: 'hau',
    })
    email: string| "";
    @ApiProperty({
        default: 'hau',
    })
    fullName: string;
    @ApiProperty({
        default: 'hauwww',
    })
    role: string;

    @ApiProperty({
        default: '09090',
    })
    phone: string;
}
