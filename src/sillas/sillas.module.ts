import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalidadesController, SillasController } from './controllers/sillas.controller';
import { Localidades } from './entities/localidades.entity';
import { Sillas } from './entities/sillas.entity';
import { LocalidadesService, SillasService } from './services/sillas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sillas, Localidades])
  ],
  controllers: [SillasController, LocalidadesController],
  providers: [SillasService, LocalidadesService],
})
export class SillasModule {}