import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SillasModule } from './sillas/sillas.module';
import { EventosModule } from './eventos/eventos.module';
require('dotenv').config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST_DEV,
      port: 5130,
      username: process.env.DATABASE_USER_DEV,
      password: process.env.DATABASE_PASSWORD_DEV,
      database: process.env.DATABASE_NAME_DEV,
      //EXTRA ES SOLO PARA PRODUCCIÓN
      // extra: {
      //   ssl: {
      //     rejectUnauthorized: false,
      //   },
      // },
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      retryDelay: 5432,
      retryAttempts: 10
    }),
    SillasModule,
    UsuariosModule,
    EventosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
