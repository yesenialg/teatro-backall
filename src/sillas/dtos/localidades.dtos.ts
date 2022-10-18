import { IsString, IsNotEmpty, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateLocalidadDto {
  @IsNotEmpty()
  @IsString()
  @Length(20)
  readonly categoria: string;

  @IsString()
  @Length(20)
  @IsNotEmpty()
  readonly localidad: string;

  @IsString()
  @IsNotEmpty()
  @Length(20)
  readonly seccion: string;
}

export class UpdateLocalidadDto extends PartialType(CreateLocalidadDto) {}