import { Boletas } from 'src/usuarios/entities/boletas.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Eventos } from './eventos.entity';

@Entity()
export class Horarios {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @ManyToOne(() => Eventos, evento => evento.horarios)
  evento: Eventos;

  @OneToMany(() => Boletas, boleta => boleta.horario)
  boletas: Boletas[];
}
