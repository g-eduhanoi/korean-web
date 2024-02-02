import { ApiProperty } from "@nestjs/swagger";


export class RegisClassReq{

    @ApiProperty({default: "1"})
    classId: number;

    @ApiProperty({default: "1"})
    courseId: number;

    @ApiProperty({default: "Nguye van a"})
    name: string;

    @ApiProperty({default: "0976578362"})
    phone: string;

    @ApiProperty({default: "addmm@gmail.com"})
    email: string;

    @ApiProperty({description: "note for admin", default: "call me at 9 am"})
    note: string;
}