import { Get, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Eventos } from '../entities/eventos.entity';
import { Horarios } from '../entities/horarios.entity';
import { Involucrados } from '../entities/involucrados.entity';
import { Disponibilidad_localidades } from '../entities/disponibilidad_localidades.entity';
import { validate } from 'class-validator';
import { S3Service } from '../../util/s3.service';

// Dtos
import { CreateDisponibilidadLocalidades, UpdateDisponibilidadLocalidadesDto } from '../dtos/disponibilidad_localidades.dto';
import { CreateInvolucrados, UpdateInvolucradosDto } from '../dtos/involucrados.dto';
import { CreateHorarios, UpdateHorariosDto } from '../dtos/horarios.dto';
import { CreateEventos, UpdateEventosDto } from '../dtos/eventos.dto';


@Injectable()
export class EventosService {

    constructor(
        @InjectRepository(Eventos) private eventosRepo: Repository<Eventos>,
        private s3Service: S3Service,
    ) { }

    findAll() {
        return this.eventosRepo.find({
            join: {
                alias: "evento",
                leftJoinAndSelect: {
                    horarios: "evento.horarios",
                    disponibilidad_localidades: "evento.disponibilidad_localidades",
                    organizador: "evento.organizador",
                    responsable: "evento.responsable",
                    categoria: "evento.categoria",
                    genero: "evento.genero"
                },
            },
        });
    }

    async findOne(id: number) {
        const evento = await this.eventosRepo.find({
            where: { id: id },
            join: {
                alias: "evento",
                leftJoinAndSelect: {
                    horarios: "evento.horarios",
                    disponibilidad_localidades: "evento.disponibilidad_localidades",
                    organizador: "evento.organizador",
                    responsable: "evento.responsable",
                    categoria: "evento.categoria",
                    genero: "evento.genero"
                },
            },
        });
        if (evento.length <= 0) {
            throw new NotFoundException(`El evento con ID '${id}' no existe.`);
        }
        return evento;
    }

    async findNomb(nombre: string) {
        const evento = await this.eventosRepo.find({
            where: [
                { nombre: nombre },
            ],
            take: 1,
        });
        if (evento.length <= 0) {
            throw new NotFoundException(`El evento '${nombre}' no existe.`);
        }
        return evento;
    }

    async findFechas(id: number) {
        const evento = await this.eventosRepo.find({
            where: { id: id },
            join: {
                alias: "evento",
                leftJoinAndSelect: {
                    horarios: "evento.horarios",
                },
            },
        });
        if (evento.length <= 0) {
            throw new NotFoundException(`El evento de ID '${id}' no existe.`);
        }
        return evento;
    }

    async create(data: CreateEventos, imagen: Express.Multer.File) {
        const evento = await this.eventosRepo.find({
            where: [
                { nombre: data.nombre },
            ],
            take: 1,
        });
        if (evento.length > 0) {
            throw new NotFoundException(`El evento ya existe.`);
        }
        var tipoDeArchivosPermitidos = [
            'image/jpeg', 
            'image/png',
            'image/jpg'
        ];
        if (tipoDeArchivosPermitidos.indexOf(imagen.mimetype) === -1){
            throw new NotFoundException(`La extensión de la imagen es incorrecta`);
        }
        const s3Response = await this.s3Service.uploadFile(imagen);
        const errorS3 = await validate(s3Response);
        if(errorS3.length > 0){
            throw new BadRequestException(errorS3)
        }
        data.imagen = s3Response.Location;
        const newEvento = this.eventosRepo.create(data);
        const errors = await validate(newEvento)
        if (errors.length > 0) {
            throw new BadRequestException(errors)
        }
        return this.eventosRepo.save(newEvento);
    }

    async update(id: number, data: UpdateEventosDto) {
        const evento = await this.eventosRepo.findOne(id);
        if (!evento) {
            throw new NotFoundException(`El evento con ID '${id}' no existe.`);
        } else {
            this.eventosRepo.merge(evento, data);
        }
        return this.eventosRepo.save(evento);
    }

    async remove(id: number) {
        const evento = await this.eventosRepo.findOne(id);
        if (!evento) {
            throw new NotFoundException(`El evento con ID '${id}' no existe.`);
        }
        await this.eventosRepo.delete(id);
        return true;
    }
}

@Injectable()
export class HorariosService {

    constructor(
        @InjectRepository(Horarios) private horariosRepo: Repository<Horarios>,
    ) { }

    findAll() {
        return this.horariosRepo.find({
            join: {
                alias: "horarios",
                leftJoinAndSelect: {
                    eventos: "horarios.evento",
                },
            },
        });
    }

    async findOne(id: number) {
        const horario = await this.horariosRepo.find({
            where: { id: id },
            join: {
                alias: "horarios",
                leftJoinAndSelect: {
                    eventos: "horarios.evento",
                },
            },
        });
        if (horario.length <= 0) {
            throw new NotFoundException(`El horario con ID '${id}' no existe.`);
        }
        return horario;
    }

    async create(data: CreateHorarios) {
        const newHorario = this.horariosRepo.create(data)
        const errors = await validate(newHorario)

        if (errors.length > 0) {
            throw new BadRequestException(errors)
        }
        return this.horariosRepo.save(newHorario);
    }

    async update(id: number, data: UpdateHorariosDto) {
        const horario = await this.horariosRepo.findOne(id);
        if (!horario) {
            throw new NotFoundException(`El horario con ID '${id}' no existe.`);
        } else {
            this.horariosRepo.merge(horario, data);
        }
        return this.horariosRepo.save(horario);
    }

    async remove(id: number) {
        const horario = await this.horariosRepo.findOne(id);
        if (!horario) {
            throw new NotFoundException(`El horario con ID '${id}' no existe.`);
        }
        await this.horariosRepo.delete(id);
        return true;
    }
}

@Injectable()
export class InvolucradosService {

    constructor(
        @InjectRepository(Involucrados) private involucradosRepo: Repository<Involucrados>,
    ) { }

    findAll() {
        return this.involucradosRepo.find();
    }

    async findOne(id: number) {
        const involucrados = await this.involucradosRepo.findOne(id);;
        if (!involucrados) {
            throw new NotFoundException(`El involucrado con ID '${id}' no existe.`);
        }
        return this.involucradosRepo.findOne(id);
    }

    async create(data: CreateInvolucrados) {
        //ROL: VALIDAR QUE SOLO INGRESEN LAS PALABRAS: Responsable - Organizador
        const newInvolucrado = this.involucradosRepo.create(data)
        const errors = await validate(newInvolucrado)
        if (errors.length > 0) {
            throw new BadRequestException(errors)
        }
        const involucradoByIdentification = await this.involucradosRepo.find({
            where: [
                { identificacion: newInvolucrado.identificacion },
            ],
            take: 1,
        });
        if (involucradoByIdentification.length > 0) {
            throw new BadRequestException(`Ya existe un involucrado con identificación '${newInvolucrado.identificacion}'.`);
        }
        return this.involucradosRepo.save(newInvolucrado);
    }

    async update(id: number, data: UpdateInvolucradosDto) {
        const involucrado = await this.involucradosRepo.findOne(id);
        if (!involucrado) {
            throw new NotFoundException(`El involucrado con ID '${id}' no existe.`);
        } else {
            this.involucradosRepo.merge(involucrado, data);
        }
        return this.involucradosRepo.save(involucrado);
    }

    async remove(id: number) {
        const involucrado = await this.involucradosRepo.findOne(id);
        if (!involucrado) {
            throw new NotFoundException(`El involucrado con ID '${id}' no existe.`);
        }
        await this.involucradosRepo.delete(id);
        return true;
    }
}

@Injectable()
export class DisponibilidadLocalidadesService {

    constructor(
        @InjectRepository(Disponibilidad_localidades) private dispolocalidadesRepo: Repository<Disponibilidad_localidades>,
    ) { }

    @Get()
    findAll() {
        return this.dispolocalidadesRepo.find({
            join: {
                alias: "disponibilidad_localidades",
                leftJoinAndSelect: {
                    localidades: "disponibilidad_localidades.localidad",
                    eventos: "disponibilidad_localidades.evento",
                },
            },
        });
    }

    async findOne(id: number) {
        const disponibilidadLocalidad = await this.dispolocalidadesRepo.find({
            where: { id: id },
            join: {
                alias: "disponibilidad_localidades",
                leftJoinAndSelect: {
                    localidades: "disponibilidad_localidades.localidad",
                    eventos: "disponibilidad_localidades.evento",
                },
            },
        });
        if (disponibilidadLocalidad.length <= 0) {
            throw new NotFoundException(`La disponibilidadLocalidad con ID '${id}' no existe.`);
        } {
            return disponibilidadLocalidad
        }
    }

    async create(data: CreateDisponibilidadLocalidades) {
        const newDispolocalidad = this.dispolocalidadesRepo.create(data);
        const errors = await validate(newDispolocalidad)
        if (errors.length > 0) {
            throw new BadRequestException(errors)
        }
        return this.dispolocalidadesRepo.save(newDispolocalidad);
    }

    async update(id: number, data: UpdateDisponibilidadLocalidadesDto) {
        const dispolocalidad = await this.dispolocalidadesRepo.findOne(id);
        if (!dispolocalidad) {
            throw new NotFoundException(`La disponibilidad y localidad con ID '${id}' no existe.`);
        } else {
            this.dispolocalidadesRepo.merge(dispolocalidad, data);
        }
        return this.dispolocalidadesRepo.save(dispolocalidad);
    }

    async remove(id: number) {
        const dispolocalidad = await this.dispolocalidadesRepo.findOne(id);
        if (!dispolocalidad) {
            throw new NotFoundException(`La disponibilidad y localidad con ID '${id}' no existe.`);
        }
        await this.dispolocalidadesRepo.delete(id);
        return true;
    }
}