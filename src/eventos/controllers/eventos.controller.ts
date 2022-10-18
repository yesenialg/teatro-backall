import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { DisponibilidadLocalidadesService, EventosService, HorariosService, InvolucradosService } from '../services/eventos.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags('eventos')
@Controller('api/eventos')
export class EventosController {

    constructor(private eventosService: EventosService) { }

    @Get()
    findAll() {
        return this.eventosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.eventosService.findOne(id);
    }

    @Get('/nombre/:nombre')
    findOneDoc(@Param('nombre') nombre: string) {
        return this.eventosService.findNomb(nombre);
    }

    @Get('/fechas/:id')
    findFechas(@Param('id') id: number) {
        return this.eventosService.findFechas(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('imagen'))
    create(@Body() body: any, @UploadedFile() imagen: Express.Multer.File) {
        return this.eventosService.create(body, imagen);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
        return this.eventosService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.eventosService.remove(id);
    }
}

@ApiTags('eventos')
@Controller('api/horarios')
export class HorariosController {

    constructor(private horariosService: HorariosService) { }


    @Get()
    findAll() {
        return this.horariosService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.horariosService.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.horariosService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
        return this.horariosService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.horariosService.remove(id);
    }
}

@ApiTags('eventos')
@Controller('api/involucrados')
export class InvolucradosController {

    constructor(private involucradosService: InvolucradosService) { }


    @Get()
    findAll() {
        return this.involucradosService.findAll();
    }
    

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.involucradosService.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        if (body.rol == "Respo" || body.rol == "Organ") {
            return this.involucradosService.create(body);
        } else {
            return "En rol debe ingresar 'Respo' o 'Organ'"
        }
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
        if (body.rol && (body.rol == "Respo" || body.rol == "Organ")) {
            return this.involucradosService.update(id, body);
        } else if (!body.rol) {
            return this.involucradosService.update(id, body);
        } else {
            return "En rol debe ingresar 'Respo' o 'Organ'"
        }
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.involucradosService.remove(id);
    }
}

@ApiTags('eventos')
@Controller('api/dispolocalidades')
export class DisponibilidadLocalidadesController {

    constructor(private dispolocalService: DisponibilidadLocalidadesService) { }


    @Get()
    findAll() {
        return this.dispolocalService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.dispolocalService.findOne(id);
    }

    @Post()
    create(@Body() body: any) {
        return this.dispolocalService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
        return this.dispolocalService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.dispolocalService.remove(id);
    }
}
