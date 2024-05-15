import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create({
        ...createProductDto,
        dateCreateProduct: new Date().toISOString(), // Genera la fecha de creación automáticamente
      });
      return await this.productRepository.save(product);
    } catch (error) {
      console.error('Error al crear el producto:', error.message);
      // Lanza una excepción personalizada con un mensaje específico
      throw new HttpException('Error al crear el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      console.error('Error al recuperar los productos:', error.message);
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
