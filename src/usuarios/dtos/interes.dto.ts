import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateInteres {
    @IsNotEmpty()
    @IsString()
    @Length(50)
    readonly nombre: string;

    @IsString()
    @Length(255)
    readonly descripcion: string;

    @IsString()
    @Length(20)
    readonly icono: string;

    @IsNotEmpty()
    @IsString()
    @Length(10)
    readonly tipo: string;
}

export class UpdateInteresDto extends PartialType(CreateInteres) { }