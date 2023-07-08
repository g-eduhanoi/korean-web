import { ApiProperty } from "@nestjs/swagger";

export class CreateClassDto {

    @ApiProperty({
        description: 'class name',
        default: "LOp 1"
    })
    name: string;

    @ApiProperty({
        description: `Session time`,
        default: '12-23',
    })
    sessionTime: string;

    @ApiProperty({
        description: 'Days of week',
        default: 'mon-tue-fri'
    })
    sessionDays: string;

    @ApiProperty({
        description: 'Start date',
        default: '01-08-2023'
    })
    startDate: Date;

    @ApiProperty({
        description: 'Category name',
        default: 1
    })
    categoryId: number;
}
