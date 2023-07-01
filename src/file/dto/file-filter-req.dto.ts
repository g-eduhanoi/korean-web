import { ApiProperty } from "@nestjs/swagger";

export class FileFilterReqDto {

    @ApiProperty({description: "search...", default: ""})
    q?: string;

    @ApiProperty({description: "file code", default: "NORMAL", enum: ["NORMAL", "GALLERY"]})
    fileCode: string

    @ApiProperty({description: "file category", default: "NORMAL"})
    category?: string;
}