import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {ContactService} from './contact.service';
import {CreateContactDto} from './dto/create-contact.dto';
import {UpdateContactDto} from './dto/update-contact.dto';
import {ReqPageableDto} from "../configure/db/req-pageable.dto";
import {ClassFilterReqDto} from "../class/dto/class-filter.dto";
import {contactFilterReqDto} from "../category/dto/contactFilterReqDto";

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {
    }

    @Post()
    create(@Body() createContactDto: CreateContactDto) {
        return this.contactService.create(createContactDto);
    }

    @Post("findAll")
    findAll(
        // @Body("pageable") pageable: ReqPageableDto,@Body("filter") reqDto: contactFilterReqDto
        @Body() {pageable, reqDto}: {
            pageable: ReqPageableDto,
            reqDto: contactFilterReqDto
        }
    ) {
        return this.contactService.findAll(pageable, reqDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.contactService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
        return this.contactService.update(+id, updateContactDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.contactService.remove(+id);
    }
}
