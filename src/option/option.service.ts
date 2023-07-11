import { Inject, Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { Option } from './entities/option.entity';
import { Op } from 'sequelize';

@Injectable()
export class OptionService {
  constructor(@Inject('OPTION_REPO') readonly optionRepo: typeof Option) { }

  async save(createOptionDto: CreateOptionDto) {
    let option = await this.optionRepo.findOne({
      where: {
        optionKey: {
          [Op.eq]: createOptionDto.optionKey
        }
      }
    });

    if (option) {
      await option.update(createOptionDto);
    }
    else
      option = await this.optionRepo.create({ ...createOptionDto });

    return option;
  }
 
  remove(id: number) {
    return `This action removes a #${id} option`;
  }
}
