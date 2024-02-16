import {BelongsTo, Column} from "sequelize-typescript";
import {Class, ClassRegistration, RegistrationTag} from "../entities/class.entity";
import {Contact, ContactTag} from "../../contact/entities/contact.entity";
import {ContactDto} from "../../contact/dto/ContactDto";
import {TagResDto} from "../../contact/dto/Tag-res.dto";

export class RegisClassResDto{
    id: number;
    name: string;
    phone: string;
    email: string;
    note: string;
    class: Class;
    courseId: Number;
    status: string;
    tags: string[];

    public static toDto(classRegistration : ClassRegistration,tags : string[]) : RegisClassResDto{
        const regisClassResDto = new RegisClassResDto();
        regisClassResDto.id = classRegistration.id;
        regisClassResDto.name = classRegistration.name;
        regisClassResDto.phone = classRegistration.phone;
        regisClassResDto.email = classRegistration.email;
        regisClassResDto.note = classRegistration.note;
        regisClassResDto.courseId = classRegistration.courseId;
        regisClassResDto.status = classRegistration.status;
        regisClassResDto.tags = tags;
        regisClassResDto.class = classRegistration.class;
        return regisClassResDto;
    }
}