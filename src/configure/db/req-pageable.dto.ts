import { ApiProperty } from "@nestjs/swagger";
import { FindOptions } from "sequelize";

export class ReqPageableDto {
    @ApiProperty({
        default: 0,
    })
    page: number ;

    @ApiProperty({
        default: 10,
    })
    size: number;

    @ApiProperty({
        default: "id,desc",
    })
    sort: string;


    static toPageable(pageable: ReqPageableDto): FindOptions {
        console.log("is page null? ", pageable.page == null);
        
        if (!pageable.page)
            pageable.page = 0;

        if (!pageable.size)
            pageable.size = 10;

        return {
            offset: Number(pageable.page) * Number(pageable.size),
            limit: Number(pageable.size),
            // @ts-ignore
            order: this.sort != null ? [this.sort.split(",")] : [["id", "desc"]]
        }
    }
}