import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const product = this.userRepository.create({
        ...createUserDto,
        dateCreateProduct: new Date().toISOString(),
      });
      return await this.userRepository.save(product);
    } catch (error) {
      console.error('Error al crear el producto:', error.message);
      throw new HttpException('Error al crear el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.error('Error al recuperar los Usarios:', error.message);
      throw new InternalServerErrorException('Error al buscar el usuario');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByName(nombre: string): Promise<User> {
    try {
      const nameUser = await this.userRepository.findOne({ where: { nombre } });
      if (!nameUser) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return nameUser;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar usuario por nombre');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const emailUser = await this.userRepository.findOne({ where: { email } });
      if (!emailUser) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return emailUser;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar usuario por nombre');
    }
  }

  async findOneByTelefono(telefono: string): Promise<User> {
    try {
      const telefonoUser = await this.userRepository.findOne({ where: { telefono } });
      if (!telefonoUser) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return telefonoUser;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar usuario por nombre');
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
