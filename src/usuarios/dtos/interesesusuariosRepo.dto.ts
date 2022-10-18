import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateInteresUsuario {
   
}

export class UpdateInteresUsuarioDto extends PartialType(CreateInteresUsuario) { }