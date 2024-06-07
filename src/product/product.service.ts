import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  private products: Product[] = []; // Aquí debes tener tus productos, puede ser una base de datos o un array en memoria

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

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
      throw new InternalServerErrorException('Error al buscar producto por ID');
    }
  }

  async findOneByName(nameProduct: string): Promise<Product> {
    try {
      const nameProduc = await this.productRepository.findOne({ where: { nameProduct } });
      if (!nameProduc) {
        throw new NotFoundException('Producto no encontrado');
      }
      return nameProduc;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar producto por nombre ID');
    }
  }


  // Este método busca productos por un rango de precios de venta
  async findByPriceSellRange(minPrice: number = 0, maxPrice: number = Infinity): Promise<Product[]> {
    try {
      // Verificar si maxPrice es Infinity y ajustar la consulta en consecuencia
      if (maxPrice === Infinity) {
        return await this.productRepository.createQueryBuilder('product')
          .where('product.priceSellProduct >= :minPrice', { minPrice })
          .getMany();
      } else {
        return await this.productRepository.createQueryBuilder('product')
          .where('product.priceSellProduct >= :minPrice', { minPrice })
          .andWhere('product.priceSellProduct <= :maxPrice', { maxPrice })
          .getMany();
      } 
    } catch (error) {
      console.error('Error al recuperar los productos:', error.message);
      throw new InternalServerErrorException('Error al buscar producto');
    }
  }

  async updateProduct(id: string, updatedProductData: UpdateProductDto): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
      }
      Object.assign(product, updatedProductData);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error al editar producto');
    }
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
    await this.productRepository.remove(product);
  }
}
