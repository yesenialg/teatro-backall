import { IsString, IsNotEmpty, Length,  } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEventos {
  @IsString()
  @Length(50)
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  @Length(30)
  readonly artista: string;

  public imagen: any;
}

export class UpdateEventosDto extends PartialType(CreateEventos) {}