import {Inject, Injectable} from "@nestjs/common";
import {Contact} from "./entities/contact.entity";
import {CreateContactDto} from "./dto/create-contact.dto";
import {ReqPageableDto} from "../configure/db/req-pageable.dto";
import {Op} from "sequelize";
import {ResPageDto} from "../configure/db/res-page.dto";
import {UpdateContactDto} from "./dto/update-contact.dto";


@Injectable()
export class ContactService {
  constructor(
      @Inject("CONTACT_REPO") private readonly contactRepo: typeof Contact,
  ) { }

  async create(createContactDto: CreateContactDto) {
    return await this.contactRepo.create({
      ...createContactDto,
    });
  }

  async findAll(pageable: ReqPageableDto) {
    if (!pageable)
      pageable = new ReqPageableDto();
    console.log(ReqPageableDto.toPageable(pageable));

    const result = await this.contactRepo.findAndCountAll({
      ...ReqPageableDto.toPageable(pageable)
    });

    const resPage: ResPageDto<Contact> = new ResPageDto();
    resPage.content = result.rows;
    resPage.totalElements = result.count;
    resPage.totalPages = Math.ceil(result.count / pageable.size);
    resPage.numberOfElements = result.rows.length;

    return resPage;
  }

  async findOne(id: number) {
    return await this.contactRepo.findByPk(id);
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.findOne(id);
    if (!contact) {
      throw new Error("Category not found");
    }
    return await contact.update({
      ...updateContactDto
    });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return await category.destroy();
  }
}
