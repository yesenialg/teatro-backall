import { Boletas } from 'src/usuarios/entities/boletas.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Localidades } from './localidades.entity';

@Entity()
export class Sillas {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 4 })
    numeracion: string;

    @ManyToOne(() => Localidades, localidad => localidad.sillas)
    localidad: Localidades;

    @OneToMany(() => Boletas, boleta => boleta.silla)
    boletas: Boletas[];

}