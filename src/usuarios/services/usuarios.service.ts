import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boletas } from '../entities/boletas.entity';
import { Intereses } from '../entities/intereses.entity';
import { Intereses_usuarios } from '../entities/intereses_usuarios.entity';
import { Usuarios } from '../entities/usuarios.entity';
import { validate } from 'class-validator';

// Dtos
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { CreateBoletaDto, UpdateBoletaDto } from '../dtos/boleta.dto';
import { CreateInteres, UpdateInteresDto } from '../dtos/interes.dto';
import { CreateInteresUsuario, UpdateInteresUsuarioDto } from '../dtos/interesesusuariosRepo.dto';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuarios) private usuariosRepo: Repository<Usuarios>,
  ) { }

  findAll() {
    return this.usuariosRepo.find();
  }

  async findOne(id: number) {
    const user = await this.usuariosRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`El usuario con ID '${id}' no existe.`);
    }
    return user;
  }

  async findCorreo(correo: string) {
    const user = await this.usuariosRepo.find({
      where: [
        { correo: correo },
      ],
      take: 1,
    });
    if (user.length <= 0) {
      throw new NotFoundException(`El usuario con email '${correo}' no existe.`);
    }
    return user;
  }

  async findIdUdem(idUdem: string) {
    let user = await this.usuariosRepo.find({
      where: [
        { identificacion_udem: idUdem },
      ],
      take: 1,
    });
    if (user.length <= 0) {
      throw new NotFoundException(`El usuario con ID UdeM '${idUdem}' no existe.`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.usuariosRepo.create(data)
    const errors = await validate(newUser)

    if (errors.length > 0) {
      throw new BadRequestException(errors)
    }

    const userByEmail = await this.usuariosRepo.find({
      where: [
        { correo: newUser.correo },
      ],
      take: 1,
    });
    if (userByEmail.length > 0) {
      throw new BadRequestException(`Ya existe un usuario con email '${newUser.correo}'.`);
    }

    const userByIdentification = await this.usuariosRepo.find({
      where: [
        { identificacion: newUser.identificacion },
      ],
      take: 1,
    });
    if (userByIdentification.length > 0) {
      throw new BadRequestException(`Ya existe un usuario con identificación '${newUser.identificacion}'.`);
    }

    return this.usuariosRepo.save(newUser);
  }

  async update(id: number, data: UpdateUserDto) {
    const usuario = await this.usuariosRepo.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`El usuario con ID '${id}' no existe.`);
    } else {
      this.usuariosRepo.merge(usuario, data);
    }
    return this.usuariosRepo.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.usuariosRepo.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`El usuario con ID '${id}' no existe.`);
    }
    await this.usuariosRepo.delete(id);
    return true;
  }
}


@Injectable()
export class BoletasService {

  constructor(
    @InjectRepository(Boletas) private boletasRepo: Repository<Boletas>,
  ) { }

  findAll() {
    return this.boletasRepo.find();
  }

  async findOne(id: number) {
    const boleta = await this.boletasRepo.findOne(id);
    if (!boleta) {
      throw new NotFoundException(`La boleta con ID '${id}' no existe.`);
    }
    return this.boletasRepo.findOne(id);
  }

  async create(data: CreateBoletaDto) {
    const newBoleta = this.boletasRepo.create(data);
    const errors = await validate(newBoleta)

    if (errors.length > 0) {
      throw new BadRequestException(errors)
    }
    return this.boletasRepo.save(newBoleta);
  }

  async update(id: number, data: UpdateBoletaDto) {
    const boleta = await this.boletasRepo.findOne(id);
    if (!boleta) {
      throw new NotFoundException(`La boleta con ID '${id}' no existe.`);
    } else {
      this.boletasRepo.merge(boleta, data);
    }
    return this.boletasRepo.save(boleta);
  }

  async remove(id: number) {
    const boleta = await this.boletasRepo.findOne(id);
    if (!boleta) {
      throw new NotFoundException(`La boleta con ID '${id}' no existe.`);
    }
    await this.boletasRepo.delete(id);
    return true;
  }
}


@Injectable()
export class InteresesService {

  constructor(
    @InjectRepository(Intereses) private interesesRepo: Repository<Intereses>,
  ) { }

  findAll() {
    return this.interesesRepo.find();
  }

  async findOne(id: number) {
    const interes = await this.interesesRepo.findOne(id);;
    if (!interes) {
      throw new NotFoundException(`El interes con ID '${id}' no existe.`);
    }
    return this.interesesRepo.findOne(id);
  }

  async create(data: CreateInteres) {
    const newInteres = this.interesesRepo.create(data)
    const errors = await validate(newInteres)

    if (errors.length > 0) {
      throw new BadRequestException(errors)
    }

    return this.interesesRepo.save(newInteres);
  }

  async update(id: number, data: UpdateInteresDto) {
    const interes = await this.interesesRepo.findOne(id);
    if (!interes) {
      throw new NotFoundException(`El interes con ID '${id}' no existe.`);
    } else {
      this.interesesRepo.merge(interes, data);
    }
    return this.interesesRepo.save(interes);
  }

  async remove(id: number) {
    const interes = await this.interesesRepo.findOne(id);
    if (!interes) {
      throw new NotFoundException(`El interes con ID '${id}' no existe.`);
    }
    await this.interesesRepo.delete(id);
    return true;
  }
}


@Injectable()
export class InteresesUsuariosService {

  constructor(
    @InjectRepository(Intereses_usuarios) private interesesusuariosRepo: Repository<Intereses_usuarios>,
  ) { }

  findAll() {
    return this.interesesusuariosRepo.find();
  }

  async findOne(id: number) {
    const interesUsuraio = await this.interesesusuariosRepo.findOne(id);;
    if (!interesUsuraio) {
      throw new NotFoundException(`El interes de usuario con ID '${id}' no existe.`);
    }
    return this.interesesusuariosRepo.findOne(id);
  }

  async create(data: CreateInteresUsuario) {
    const newInteresUsuario = this.interesesusuariosRepo.create(data)
    const errors = await validate(newInteresUsuario)

    if (errors.length > 0) {
      throw new BadRequestException(errors)
    }

    return this.interesesusuariosRepo.save(newInteresUsuario);
  }

  async update(id: number, data: UpdateInteresUsuarioDto) {
    const interesUsuario = await this.interesesusuariosRepo.findOne(id);
    if (!interesUsuario) {
      throw new NotFoundException(`El interes de usuario con ID '${id}' no existe.`);
    } else {
      this.interesesusuariosRepo.merge(interesUsuario, data);
    }
    return this.interesesusuariosRepo.save(interesUsuario);
  }

  async remove(id: number) {
    const interesUsuario = await this.interesesusuariosRepo.findOne(id);
    if (!interesUsuario) {
      throw new NotFoundException(`El interes de usuario con ID '${id}' no existe.`);
    }
    await this.interesesusuariosRepo.delete(id);
    return true;
  }
}
