import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Boletas } from './boletas.entity';
import { Intereses_usuarios } from './intereses_usuarios.entity';

@Entity()
export class Usuarios {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(0, 255)
    @IsNotEmpty()
    nombre: string;

    @Column()
    @Length(0, 15)
    @IsNotEmpty()
    identificacion: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    correo: string;

    @Column({ length: 10, nullable: true })
    celular: string;

    @Column({ length: 10, nullable: true })
    identificacion_udem: string;
    
    @OneToMany(() => Boletas, boleta => boleta.usuario)
    boletas: Boletas[];
    
    @OneToMany(() => Intereses_usuarios, intereses_usuario => intereses_usuario.usuario)
    intereses_usuarios: Intereses_usuarios[];
}
