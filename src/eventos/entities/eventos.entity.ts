import { Intereses } from 'src/usuarios/entities/intereses.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Disponibilidad_localidades } from './disponibilidad_localidades.entity';
import { Horarios } from './horarios.entity';
import { Involucrados } from './involucrados.entity';

@Entity()
export class Eventos {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true})
  nombre: string;

  @Column({ length: 30 })
  artista: string;

  @Column({ nullable: true })
  imagen: string;

  @ManyToOne(() => Intereses, genero => genero.eventos)
  genero: Intereses;

  @ManyToOne(() => Intereses, categoria => categoria.eventos)
  categoria: Intereses;

  @ManyToOne(() => Involucrados, genero => genero.involucrados)
  responsable: Involucrados;

  @ManyToOne(() => Involucrados, categoria => categoria.involucrados)
  organizador: Involucrados;

  @OneToMany(() => Disponibilidad_localidades, disponibilidad_localidad => disponibilidad_localidad.evento)
  disponibilidad_localidades: Disponibilidad_localidades[];

  @OneToMany(() => Horarios, horario => horario.evento)
  horarios: Horarios[];
}