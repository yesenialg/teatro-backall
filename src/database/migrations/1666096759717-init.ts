import {MigrationInterface, QueryRunner} from "typeorm";

export class init1666096759717 implements MigrationInterface {
    name = 'init1666096759717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "identificacion" character varying NOT NULL, "correo" character varying NOT NULL, "celular" character varying(10), "identificacion_udem" character varying(10), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "intereses_usuarios" ("id" SERIAL NOT NULL, "usuarioId" integer, "interesId" integer, CONSTRAINT "PK_62b52a51777d17d7214c92237e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "intereses" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying(255), "icono" character varying(20), "tipo" character varying(10) NOT NULL, CONSTRAINT "PK_c7c8dfc7d77547d0ea374ce6c3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "involucrados" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "numero_puleb" character varying(10), "identificacion" character varying(20), "rol" character varying(12) NOT NULL, CONSTRAINT "PK_68b4e7fa2133310447b4f002446" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "eventos" ("id" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, "artista" character varying(30) NOT NULL, "imagen" character varying, "generoId" integer, "categoriaId" integer, "responsableId" integer, "organizadorId" integer, CONSTRAINT "UQ_9b4bc064a9089acef099d8335df" UNIQUE ("nombre"), CONSTRAINT "PK_40d4a3c6a4bfd24280cb97a509e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "horarios" ("id" SERIAL NOT NULL, "timestamp" TIMESTAMP NOT NULL, "eventoId" integer, CONSTRAINT "PK_c69b602fc8441125f1310a4858d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boletas" ("id" SERIAL NOT NULL, "usuarioId" integer, "sillaId" integer, "horarioId" integer, CONSTRAINT "PK_a02a97e94c22598e65fed41552c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sillas" ("id" SERIAL NOT NULL, "numeracion" character varying(4) NOT NULL, "localidadId" integer, CONSTRAINT "PK_4aa5699ceb31222413af838c7a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "localidades" ("id" SERIAL NOT NULL, "categoria" character varying(20) NOT NULL, "localidad" character varying(20) NOT NULL, "seccion" character varying(20) NOT NULL, CONSTRAINT "PK_5bdb0ef5463491e8f3259dd1ae1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "disponibilidad_localidades" ("id" SERIAL NOT NULL, "precio" character varying(10) NOT NULL, "localidadId" integer, "eventoId" integer, CONSTRAINT "PK_4a1b18e7ddc07debfc1da68f463" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "intereses_usuarios" ADD CONSTRAINT "FK_41c3d1bdd1b8b31d9469dd67358" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "intereses_usuarios" ADD CONSTRAINT "FK_e4d96beb656ca80358dbca99cff" FOREIGN KEY ("interesId") REFERENCES "intereses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventos" ADD CONSTRAINT "FK_51783f823d581275de5c4258f53" FOREIGN KEY ("generoId") REFERENCES "intereses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventos" ADD CONSTRAINT "FK_14b34d3530265779719e998771b" FOREIGN KEY ("categoriaId") REFERENCES "intereses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventos" ADD CONSTRAINT "FK_ae2edd93b9721b94a727af4b60c" FOREIGN KEY ("responsableId") REFERENCES "involucrados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventos" ADD CONSTRAINT "FK_bc3b9f35d1a810c5d9e528d9854" FOREIGN KEY ("organizadorId") REFERENCES "involucrados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "horarios" ADD CONSTRAINT "FK_da17a438ba647e255bb68b223b8" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boletas" ADD CONSTRAINT "FK_86926c31df1962f08d725d43a2a" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boletas" ADD CONSTRAINT "FK_2117e4f724515cf8c3b703f6e52" FOREIGN KEY ("sillaId") REFERENCES "sillas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boletas" ADD CONSTRAINT "FK_25d2410352dbc5c4b584ef8d094" FOREIGN KEY ("horarioId") REFERENCES "horarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sillas" ADD CONSTRAINT "FK_9fb97abe012a334e9694ca0dd85" FOREIGN KEY ("localidadId") REFERENCES "localidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "disponibilidad_localidades" ADD CONSTRAINT "FK_efa637719c24ec9a3f80a0a3722" FOREIGN KEY ("localidadId") REFERENCES "localidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "disponibilidad_localidades" ADD CONSTRAINT "FK_4795608e4092aa13c9049b6001e" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "disponibilidad_localidades" DROP CONSTRAINT "FK_4795608e4092aa13c9049b6001e"`);
        await queryRunner.query(`ALTER TABLE "disponibilidad_localidades" DROP CONSTRAINT "FK_efa637719c24ec9a3f80a0a3722"`);
        await queryRunner.query(`ALTER TABLE "sillas" DROP CONSTRAINT "FK_9fb97abe012a334e9694ca0dd85"`);
        await queryRunner.query(`ALTER TABLE "boletas" DROP CONSTRAINT "FK_25d2410352dbc5c4b584ef8d094"`);
        await queryRunner.query(`ALTER TABLE "boletas" DROP CONSTRAINT "FK_2117e4f724515cf8c3b703f6e52"`);
        await queryRunner.query(`ALTER TABLE "boletas" DROP CONSTRAINT "FK_86926c31df1962f08d725d43a2a"`);
        await queryRunner.query(`ALTER TABLE "horarios" DROP CONSTRAINT "FK_da17a438ba647e255bb68b223b8"`);
        await queryRunner.query(`ALTER TABLE "eventos" DROP CONSTRAINT "FK_bc3b9f35d1a810c5d9e528d9854"`);
        await queryRunner.query(`ALTER TABLE "eventos" DROP CONSTRAINT "FK_ae2edd93b9721b94a727af4b60c"`);
        await queryRunner.query(`ALTER TABLE "eventos" DROP CONSTRAINT "FK_14b34d3530265779719e998771b"`);
        await queryRunner.query(`ALTER TABLE "eventos" DROP CONSTRAINT "FK_51783f823d581275de5c4258f53"`);
        await queryRunner.query(`ALTER TABLE "intereses_usuarios" DROP CONSTRAINT "FK_e4d96beb656ca80358dbca99cff"`);
        await queryRunner.query(`ALTER TABLE "intereses_usuarios" DROP CONSTRAINT "FK_41c3d1bdd1b8b31d9469dd67358"`);
        await queryRunner.query(`DROP TABLE "disponibilidad_localidades"`);
        await queryRunner.query(`DROP TABLE "localidades"`);
        await queryRunner.query(`DROP TABLE "sillas"`);
        await queryRunner.query(`DROP TABLE "boletas"`);
        await queryRunner.query(`DROP TABLE "horarios"`);
        await queryRunner.query(`DROP TABLE "eventos"`);
        await queryRunner.query(`DROP TABLE "involucrados"`);
        await queryRunner.query(`DROP TABLE "intereses"`);
        await queryRunner.query(`DROP TABLE "intereses_usuarios"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
