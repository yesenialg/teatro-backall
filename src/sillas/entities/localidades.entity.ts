import { Disponibilidad_localidades } from 'src/eventos/entities/disponibilidad_localidades.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Sillas } from './sillas.entity';

@Entity()
export class Localidades {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    categoria: string; //Normal - Discapacidad - Ambas

    @Column({ length: 20 })
    localidad: string; //Luneta - Bloque

    @Column({ length: 20 })
    seccion: string; //Centro - Derecha - Izquierda

    @OneToMany(() => Disponibilidad_localidades, disponibilidad_localidad => disponibilidad_localidad.localidad)
    disponibilidad_localidades: Disponibilidad_localidades[];
    
    @OneToMany(() => Sillas, silla => silla.localidad)
    sillas: Sillas[];
}