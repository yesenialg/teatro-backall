import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Eventos } from './eventos.entity';

@Entity()
export class Involucrados {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ length: 10, nullable: true })
  numero_puleb: string;

  @Column({ length: 20, nullable: true })
  identificacion: string;

  @Column({ length: 12 })
  rol: string; //Respo - Organ

  @OneToMany(() => Eventos, involucrado => involucrado.responsable)
  @OneToMany(() => Eventos, involucrado => involucrado.organizador)
  involucrados: Eventos[];
}