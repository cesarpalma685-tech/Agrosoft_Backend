import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramaFormacionOrmEntity } from './infraestructure/persistence/programa-formacion.orm-entity';
import { ProgramaFormacionTypeOrmRepository } from './infraestructure/repositories/programa-formacion-typeorm.repository';

import { ProgramaFormacionRepository } from './aplication/ports/programa-formacion.repository';

import { ProgramasFormacionController } from './infraestructure/controllers/programas-formacion.controller';

import { CrearProgramaFormacionUseCase } from './aplication/use-cases/crear-programa-formacion.usecase';
import { ActualizarProgramaFormacionUseCase } from './aplication/use-cases/actualizar-programa-formacion.usecase';
import { EliminarProgramaFormacionUseCase } from './aplication/use-cases/eliminar-programa-formacion.usecase';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProgramaFormacionOrmEntity,
    ]),
  ],

  controllers: [
    ProgramasFormacionController,
  ],

  providers: [
    CrearProgramaFormacionUseCase,
    ActualizarProgramaFormacionUseCase,
    EliminarProgramaFormacionUseCase,
    {
      provide: ProgramaFormacionRepository,
      useClass: ProgramaFormacionTypeOrmRepository,
    },
  ],

  exports: [
    ProgramaFormacionRepository,
  ],
})
export class ProgramaFormacionModule {}
