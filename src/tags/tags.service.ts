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
import { UpperOneLetterService } from 'src/services/upper-one-letter/upper-one-letter.service';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly upperOneLetterService: UpperOneLetterService,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const { nameTags } = createTagDto;

    const transformedNameTags = this.upperOneLetterService.transformText(nameTags);

    // Verificar si el tag ya existe
    const existingTag = await this.tagRepository.findOne({
      where: { nameTags: transformedNameTags },
    });
    if (existingTag) {
      throw new HttpException(
        `El tag con el nombre ${transformedNameTags} ya existe.`,
        HttpStatus.CONFLICT,
      );
    }

    try {
      const tag = this.tagRepository.create({ nameTags: transformedNameTags });
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
