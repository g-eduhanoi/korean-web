import {Contact, ContactTag} from "../entities/contact.entity";

import {TagResDto} from "./Tag-res.dto";
import {ContactDto} from "./ContactDto";


export class ContactResDto {
    id: number
    fullName: string;
    email: string;
    phone: string;
    content: string;
    tagDtos: TagResDto[];

    public ContactResDto(contact : Contact,tags : ContactTag[]){
        this.fullName = contact.fullName;
        this.email = contact.fullName;
        this.phone = contact.phone;
        this.content = contact.content;
        this.id = contact.id;
        this.tagDtos = tags?.map((x :ContactTag) => new TagResDto(x));
    }

    public toDto(contact : Contact,tags : ContactTag[]) : ContactDto{
        const contactResDto = new ContactResDto();
        contactResDto.fullName = contact.fullName;
        contactResDto.email = contact.fullName;
        contactResDto.phone = contact.phone;
        contactResDto.content = contact.content;
        contactResDto.id = contact.id;
        contactResDto.tagDtos = tags?.map((x :ContactTag) => new TagResDto(x));
        return contactResDto;
    }

}
