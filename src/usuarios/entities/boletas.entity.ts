import { Horarios } from 'src/eventos/entities/horarios.entity';
import { Sillas } from 'src/sillas/entities/sillas.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Usuarios } from './usuarios.entity';

@Entity()
export class Boletas {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuarios, usuario => usuario.boletas)
    usuario: Usuarios;

    @ManyToOne(() => Sillas, silla => silla.boletas)
    silla: Sillas;

    @ManyToOne(() => Horarios, horario => horario.boletas)
    horario: Horarios;
}