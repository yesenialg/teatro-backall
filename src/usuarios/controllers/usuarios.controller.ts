import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BoletasService, InteresesService, InteresesUsuariosService, UsuariosService } from '../services/usuarios.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('api/usuarios')
export class UsuariosController {

  constructor(private usuarioService: UsuariosService) { }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @Get('correo/:correo')
  findCorreo(@Param('correo') correo: string) {
    return this.usuarioService.findCorreo(correo);
  }
  
  @Get('idudem/:idUdem')
  findidUdem(@Param('idUdem') idUdem: string) {
    return this.usuarioService.findIdUdem(idUdem);
  }

  @Post()
  create(@Body() body: any) {
    return this.usuarioService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.usuarioService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }
}

@ApiTags('boletas')
@Controller('api/boletas')
export class BoletasController {

  constructor(private boletaService: BoletasService) { }

  @Get()
  findAll() {
    return this.boletaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.boletaService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.boletaService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.boletaService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.boletaService.remove(id);
  }
}

@ApiTags('intereses')
@Controller('api/intereses')
export class InteresesController {

  constructor(private interesService: InteresesService) { }

  @Get()
  findAll() {
    return this.interesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.interesService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    if (body.tipo == "Categoria" || body.tipo == "Genero") {
      return this.interesService.create(body);
    } else {
      return "En tipo debe ingresar 'Categoria' o 'Genero'"
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    if (body.tipo && (body.tipo == "Categoria" || body.tipo == "Genero")) {
      return this.interesService.update(id, body);
  } else if (!body.tipo) {
    return this.interesService.update(id, body);
  } else {
    return "En tipo debe ingresar 'Categoria' o 'Genero'"
  }
    return this.interesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.interesService.remove(id);
  }
}

@ApiTags('intereses-usuario')
@Controller('api/interesesusuario')
export class InteresesUsuariosController {

  constructor(private interesusuarioService: InteresesUsuariosService) { }

  @Get()
  findAll() {
    return this.interesusuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.interesusuarioService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.interesusuarioService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.interesusuarioService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.interesusuarioService.remove(id);
  }
}