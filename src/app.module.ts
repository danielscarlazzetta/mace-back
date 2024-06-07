import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './shared/database-config';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), ProductModule, AuthModule, TagsModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
