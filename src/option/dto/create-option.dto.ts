import { ApiProperty } from "@nestjs/swagger";

export class CreateOptionDto {
    @ApiProperty({
        description: 'option key',
        default: 'opt_key'
    })
    optionKey: string;

    @ApiProperty({
        description: 'option value',
        default: 'value'
    })
    optionValue: string;    
}
