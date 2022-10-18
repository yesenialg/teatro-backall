import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(30)
  readonly nombre: string;

  @IsString()
  @Length(30)
  @IsNotEmpty()
  readonly identificacion: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(50)
  readonly correo: string;

  @IsString()
  @Length(10)
  readonly celular: string;

  @IsString()
  @Length(10)
  readonly identificacion_udem: string;

}

export class UpdateUserDto extends PartialType(CreateUserDto) {}