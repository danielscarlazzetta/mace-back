import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}


//! para solucionar este problema debemos agregar si o si este codigo de typeORM
/*
imports: [
    TypeOrmModule.forFeature([Product]),
  ],*/
/*
@Module({
    imports: [ /* the Module containing "ProductRepository" */ /*]
  })

  */