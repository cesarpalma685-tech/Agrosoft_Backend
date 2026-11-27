import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContingenciaOrmEntity } from "./infrastructure/persistence/contingencia.orm-entity";
import { TratamientoOrmEntity } from "./infrastructure/persistence/tratamiento.orm-entity";
import { CultivoOrmEntity } from "../cultivo/infrastructure/persistence/cultivo.orm-entity";
import { UsuarioOrmEntity } from "../../identidad/usuarios/infraestructure/persistence/usuario.orm-entity";
import { ControlFitosanitarioService } from "./application/control-fitosanitario.service";
import { ContingenciasController, TratamientosController } from "./infrastructure/control-fitosanitario.controllers";

@Module({
  imports: [TypeOrmModule.forFeature([ContingenciaOrmEntity, TratamientoOrmEntity, CultivoOrmEntity, UsuarioOrmEntity])],
  controllers: [ContingenciasController, TratamientosController],
  providers: [ControlFitosanitarioService],
})
export class ControlFitosanitarioModule {}
