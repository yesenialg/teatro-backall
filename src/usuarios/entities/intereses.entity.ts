import { Eventos } from 'src/eventos/entities/eventos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Intereses_usuarios } from './intereses_usuarios.entity';

@Entity()
export class Intereses {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ length: 255, nullable: true })
    descripcion: string;

    @Column({ length: 20, nullable: true })
    icono: string;

    @Column({ length: 10 }) //Genero - Categoria
    tipo: string;

    @OneToMany(() => Eventos, evento => evento.genero)
    @OneToMany(() => Eventos, evento => evento.categoria)
    eventos: Eventos[];

    @OneToMany(() => Intereses_usuarios, intereses_usuario => intereses_usuario.interes)
    intereses_usuarios: Intereses_usuarios[];
}