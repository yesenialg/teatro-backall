import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoletasController, InteresesController, InteresesUsuariosController, UsuariosController } from './controllers/usuarios.controller';
import { Boletas } from './entities/boletas.entity';
import { Intereses } from './entities/intereses.entity';
import { Intereses_usuarios } from './entities/intereses_usuarios.entity';
import { Usuarios } from './entities/usuarios.entity';
import { BoletasService, InteresesService, InteresesUsuariosService, UsuariosService } from './services/usuarios.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Boletas, Intereses_usuarios, Intereses, Usuarios])
  ],
  controllers: [UsuariosController, BoletasController, InteresesController, InteresesUsuariosController],
  providers: [UsuariosService, BoletasService, InteresesService, InteresesUsuariosService],
})
export class UsuariosModule {}
