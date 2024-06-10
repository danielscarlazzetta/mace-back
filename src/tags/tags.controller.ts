import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post('addtag')
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get('tags')
  findAll() {
    return this.tagsService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOneById(id);
  }

  @Get('nameTags/:nameTags')
  findOneName(@Param('nameTags') nameProduct: string) {
    return this.tagsService.findOneByName(nameProduct);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
