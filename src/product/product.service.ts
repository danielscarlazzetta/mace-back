import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
        dateCreateProduct: new Date().toISOString(),
      });
      return await this.productRepository.save(product);
    } catch (error) {
      console.error('Error al crear el producto:', error.message);
      throw new HttpException('Error al crear el producto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      console.error('Error al recuperar los productos:', error.message);
      throw new InternalServerErrorException('Error al buscar producto');
    }
  }

  async findOneById(id: string): Promise<Product> {
    try {
      const produc = await this.productRepository.findOne({ where: { id } });
      if (!produc) {
        throw new NotFoundException('Producto no encontrado');
      }
      return produc;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar usuario por ID');
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
