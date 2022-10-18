import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localidades } from '../entities/localidades.entity';
import { Sillas } from '../entities/sillas.entity';
import { validate } from 'class-validator';

// Dtos
import { CreateSillaDto, UpdateSillaDto } from '../dtos/silla.dto';
import { CreateLocalidadDto, UpdateLocalidadDto } from '../dtos/localidades.dtos';


@Injectable()
export class SillasService {

    constructor(
        @InjectRepository(Sillas) private sillasRepo: Repository<Sillas>,
    ) { }

    findAll() {
        return this.sillasRepo.find();
    }

    async findOne(id: number) {
        const silla = await this.sillasRepo.findOne(id);;
        if (!silla) {
            throw new NotFoundException(`La silla con ID '${id}' no existe.`);
        }
        return this.sillasRepo.findOne(id);
    }

    async create(data: CreateSillaDto) {
        const newSilla = this.sillasRepo.create(data);
        const errors = await validate(newSilla)

        if (errors.length > 0) {
            throw new BadRequestException(errors)
        }
        const sillaByID = await this.sillasRepo.find({
            where: [
                { numeracion: newSilla.numeracion },
            ],
            take: 1,
        });
        if (sillaByID.length > 0) {
            throw new BadRequestException(`La silla '${newSilla.numeracion}' ya existe.`);
        }
        return this.sillasRepo.save(newSilla);
    }

    async update(id: number, data: UpdateSillaDto) {
        const silla = await this.sillasRepo.findOne(id);
        if (!silla) {
            throw new NotFoundException(`La silla con ID '${id}' no existe.`);
        } else {
            this.sillasRepo.merge(silla, data);
        }
        return this.sillasRepo.save(silla);
    }

    async remove(id: number) {
        const silla = await this.sillasRepo.findOne(id);
        if (!silla) {
            throw new NotFoundException(`La silla con ID '${id}' no existe.`);
        }
        await this.sillasRepo.delete(id);
        return true;
    }
}

@Injectable()
export class LocalidadesService {

    constructor(
        @InjectRepository(Localidades) private localidadesRepo: Repository<Localidades>,
    ) { }

    findAll() {
        return this.localidadesRepo.find();
    }

    async findOne(id: number) {
        const localidad = await this.localidadesRepo.findOne(id);;
        if (!localidad) {
            throw new NotFoundException(`La localidad '${id}' no existe.`);
        }
        return this.localidadesRepo.findOne(id);
    }

    async create(data: CreateLocalidadDto) {
        const newLocalidad = this.localidadesRepo.create(data)
        const errors = await validate(newLocalidad)

        if (errors.length > 0) {
            throw new BadRequestException(errors)
        }
        return this.localidadesRepo.save(newLocalidad);
    }

    async update(id: number, data: UpdateLocalidadDto) {
        const localidad = await this.localidadesRepo.findOne(id);
        if (!localidad) {
            throw new NotFoundException(`La localidad con ID: '${id}' no existe.`);
        } else {
            this.localidadesRepo.merge(localidad, data);
        }
        return this.localidadesRepo.save(localidad);
    }

    async remove(id: number) {
        const localidad = await this.localidadesRepo.findOne(id);
        if (!localidad) {
            throw new NotFoundException(`La localidad con ID '${id}' no existe.`);
        }
        await this.localidadesRepo.delete(id);
        return true;
    }
}
