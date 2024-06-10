import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly productRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const product = this.productRepository.create({
        ...createUserDto,
        dateCreateProduct: new Date().toISOString(),
      });
      return await this.productRepository.save(product);
    } catch (error) {
      console.error('Error al crear el producto:', error.message);
      throw new HttpException('Error al crear el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      console.error('Error al recuperar los Usarios:', error.message);
      throw new InternalServerErrorException('Error al buscar el usuario');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
