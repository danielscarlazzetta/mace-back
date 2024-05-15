import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('product')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('findproduct')
  findAll() {
    return this.productService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOneById(id);
  }
  
  @Get('nameProduct/:nameProduct')
  findOneName(@Param('nameProduct') nameProduct: string) {
    return this.productService.findOneByName(nameProduct);
  }

  //! Buscar este endpoint en Postman
  //http://localhost:3000/product/byPriceSellRange?minPrice=50&maxPrice=200
  @Get('byPriceSellRange')
  async findByPriceSellRange(@Query('minPrice') minPrice: number, @Query('maxPrice') maxPrice: number): Promise<Product[]> {
    return await this.productService.findByPriceSellRange(minPrice, maxPrice);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
