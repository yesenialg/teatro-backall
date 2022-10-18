import { IsString, IsNotEmpty, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDisponibilidadLocalidades {
  @IsNotEmpty()
  @IsString()
  @Length(10)
  readonly precio: string;
}

export class UpdateDisponibilidadLocalidadesDto extends PartialType(CreateDisponibilidadLocalidades) {}