import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Product } from 'src/product/entities/product.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'passmace123123',
  database: 'mace',
  entities: [Auth, Product],
  synchronize: true,
};