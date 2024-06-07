import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const { nameTags } = createTagDto;

    // Verificar si el tag ya existe
    const existingTag = await this.tagRepository.findOne({
      where: { nameTags },
    });
    if (existingTag) {
      throw new HttpException(
        `El tag con el nombre ${nameTags} ya existe.`,
        HttpStatus.CONFLICT,
      );
    }

    try {
      const tag = this.tagRepository.create({ nameTags });
      return await this.tagRepository.save(tag);
    } catch (error) {
      console.error('Error al crear el Tag: ', error.message);
      throw new HttpException(
        'Error al crear el Tag',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Tag[]> {
    try {
      return await this.tagRepository.find();
    } catch (error) {
      console.error('Error al recuperar los Tags:', error.message);
      throw new InternalServerErrorException('Error al buscar Tag');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
