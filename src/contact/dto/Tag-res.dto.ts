import {ContactTag} from "../entities/contact.entity";

export class TagResDto {
    name: string;
    id: number;
    public constructor(tag: ContactTag) {
        this.id= tag.id;
        this.name= tag.name;
    }
}