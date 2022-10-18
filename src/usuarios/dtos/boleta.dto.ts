import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateBoletaDto {

}

export class UpdateBoletaDto extends PartialType(CreateBoletaDto) {}