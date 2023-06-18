import { ApiProperty } from "@nestjs/swagger";

export class CreateTagDto {
    @ApiProperty({
        default: 'Tag name',
    })
    name: string;
}
