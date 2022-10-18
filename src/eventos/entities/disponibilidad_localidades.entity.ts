import { Localidades } from 'src/sillas/entities/localidades.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Eventos } from './eventos.entity';

@Entity()
export class Disponibilidad_localidades {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Localidades, localidad => localidad.disponibilidad_localidades)
  localidad: Localidades;
  
  @Column({ length: 10 })
  precio: string;

  @ManyToOne(() => Eventos, evento => evento.disponibilidad_localidades)
  evento: Eventos;



}