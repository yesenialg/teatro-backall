import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LocalidadesService, SillasService } from '../services/sillas.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sillas')
@Controller('api/sillas')
export class SillasController {

  constructor(private sillasService: SillasService) { }

  @Get()
  findAll() {
    return this.sillasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sillasService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.sillasService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.sillasService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.sillasService.remove(id);
  }
}

@ApiTags('localidades')
@Controller('api/localidades')
export class LocalidadesController {

  constructor(private localidadesService: LocalidadesService) { }

  @Get()
  findAll() {
    return this.localidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.localidadesService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.localidadesService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.localidadesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.localidadesService.remove(id);
  }
}
