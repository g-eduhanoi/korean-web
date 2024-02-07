import {Inject, Injectable} from "@nestjs/common";
import {Contact, ContactTag} from "./entities/contact.entity";
import {CreateContactDto} from "./dto/create-contact.dto";
import {ReqPageableDto} from "../configure/db/req-pageable.dto";
import {Op} from "sequelize";
import {ResPageDto} from "../configure/db/res-page.dto";
import {UpdateContactDto} from "./dto/update-contact.dto";
import {contactFilterReqDto} from "../category/dto/contactFilterReqDto";
import {ResPostDto} from "../post/dto/res-post.dto";
import {TagDto} from "./dto/TagDto";
import {ContactResDto} from "./dto/contact-res.dto";
import {Tag} from "../tag/entities/tag.entity";
import {TagResDto} from "./dto/Tag-res.dto";
import {ContactDto} from "./dto/ContactDto";
import any = jasmine.any;


@Injectable()
export class ContactService {
  constructor(
      @Inject("CONTACT_REPO") private readonly contactRepo: typeof Contact,
      @Inject("CONTACT_TAG_REPO") private readonly tagRepo: typeof ContactTag,
  ) { }

  async create(createContactDto: CreateContactDto) {
    const contact = new ContactDto();
    contact.fullName = createContactDto.fullName;
    contact.email = createContactDto.email;
    contact.phone = createContactDto.phone;
    contact.content = createContactDto.content;
    const result:Contact = await this.contactRepo.create({
      ...contact,
    })
    const tags= new Array<ContactTag>();
    for (const x of createContactDto?.tags) {
      const tagContact = new ContactTag();
      tagContact.contactId= result.id;
      tagContact.name = x;
      const tag : ContactTag = await this.tagRepo.create(
      {
        name: tagContact.name,
        contactId: tagContact.contactId,
        },
      )
      tags.push(tag)
    }
    const contactResult = new ContactResDto();
    contactResult.ContactResDto(result,tags)
    return contactResult;
  }

  async findAll(pageable: ReqPageableDto,reqDto : contactFilterReqDto) {
    if (!pageable)
      pageable = new ReqPageableDto();
    pageable.page -= 1;
    let whereBuilder: {
      [Op.like]?: object,
    } = {};

    if (reqDto != null && reqDto.textSearch)
      whereBuilder[Op.or] = [
        { fullName: { [Op.like]: `%${reqDto.textSearch}%` } },
        { email: { [Op.like]: `%${reqDto.textSearch}%` } },
        { phone: { [Op.like]: `%${reqDto.textSearch}%` } },
        { fullName: { [Op.like]: `%${reqDto.textSearch}%` } },
      ];
    const result = await this.contactRepo.findAndCountAll({
      ...ReqPageableDto.toPageable(pageable),
      where: whereBuilder
    });
    const contactResDto = new ContactResDto();
    const contactDtos = new Array<ContactResDto>()
    for (const x of result.rows) {
      const resultTag = await this.tagRepo.findAndCountAll({
        where: { contactId: x.id }
      })
      const tags : ContactTag[] = resultTag.rows;
      contactDtos.push(<ContactResDto>contactResDto.toDto(x,tags));
    }

    const resPage: ResPageDto<ContactResDto> = new ResPageDto();
    resPage.content = contactDtos;
    resPage.totalElements = result.count;
    resPage.totalPages = Math.ceil(result.count / pageable.size);
    resPage.numberOfElements = result.rows.length;

    return resPage;
  }

  async findOne(id: number) {
    const contact = await this.contactRepo.findByPk(id);
    const tags = await this.tagRepo.findAndCountAll({
      where: { contactId:id}
    })
    const contactRes = new ContactResDto();

    return contactRes.toDto(contact,tags.rows);
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.findOne(id);
    if (!contact) {
      throw new Error("Category not found");
    }
    contact.fullName = updateContactDto.fullName;
    contact.email = updateContactDto.email;
    contact.phone = updateContactDto.phone;
    contact.content = updateContactDto.content;


    await this.contactRepo.update({ ...contact }, {
      where: {
        id: id,
      },
    })
    const contactRes : Contact = await this.contactRepo.findByPk(id);
    const tags= new Array<ContactTag>();

    this.tagRepo.destroy({
      where: { contactId: id }
    })

    for (const x of updateContactDto?.tags) {
      const tagContact = new ContactTag();
      tagContact.contactId= id;
      tagContact.name = x;
      const tag : ContactTag = await this.tagRepo.create(
          {
            name: tagContact.name,
            contactId: tagContact.contactId,
          },
      )
      tags.push(tag)
    }
    const contactResult = new ContactResDto();

    return contactResult.toDto(contactRes,tags);
  }

  async remove(id: number) {
    const contact = await this.contactRepo.findByPk(id);
    if (!contact) {
      throw new Error(`Contact with ID ${id} not found`);
    }
    return await contact.destroy();
  }
}
