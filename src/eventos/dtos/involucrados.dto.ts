import { IsString, IsNotEmpty, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateInvolucrados {
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @Length(10)
  readonly numero_puleb: string;

  @IsNotEmpty()
  @Length(20)
  readonly identificacion: string;

  @IsNotEmpty()
  @Length(12)
  readonly rol: string;
}

export class UpdateInvolucradosDto extends PartialType(CreateInvolucrados) {}