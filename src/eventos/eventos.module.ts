import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisponibilidadLocalidadesController, EventosController, HorariosController, InvolucradosController } from './controllers/eventos.controller';
import { Eventos } from './entities/eventos.entity';
import { Horarios } from './entities/horarios.entity';
import { Involucrados } from './entities/involucrados.entity';
import { Disponibilidad_localidades } from './entities/disponibilidad_localidades.entity';
import { DisponibilidadLocalidadesService, EventosService, HorariosService, InvolucradosService } from './services/eventos.service';
import { S3Service } from '../util/s3.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([Eventos, Horarios, Involucrados, Disponibilidad_localidades])
    ],
    controllers: [EventosController, HorariosController, InvolucradosController, DisponibilidadLocalidadesController],
    providers: [EventosService, HorariosService, InvolucradosService, DisponibilidadLocalidadesService, S3Service],
  })
  export class EventosModule {}