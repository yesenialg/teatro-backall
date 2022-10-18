import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Intereses } from './intereses.entity';
import { Usuarios } from './usuarios.entity';

@Entity()
export class Intereses_usuarios {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuarios, usuario => usuario.intereses_usuarios)
    usuario: Usuarios;

    @ManyToOne(() => Intereses, interes => interes.intereses_usuarios)
    interes: Intereses;
}
