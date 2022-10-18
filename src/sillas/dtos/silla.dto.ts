import { IsString, IsNotEmpty, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSillaDto {
  @IsNotEmpty()
  @IsString()
  @Length(4)
  readonly numeracion: string;
}

export class UpdateSillaDto extends PartialType(CreateSillaDto) { }