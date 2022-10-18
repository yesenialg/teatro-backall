import { IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateHorarios {
  @IsDate()
  readonly timestamp: Date;
}

export class UpdateHorariosDto extends PartialType(CreateHorarios) {}