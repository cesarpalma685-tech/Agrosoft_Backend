import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramaFormacionOrmEntity } from './infrastructure/persistence/programa-formacion.orm-entity';
import { ProgramaFormacionTypeOrmRepository } from './infrastructure/persistence/programa-formacion-typeorm.repository';

import { ProgramaFormacionRepository } from './domain/programa-formacion.repository';

import { ProgramasFormacionController } from './infrastructure/http/programas-formacion.controller';

import { CrearProgramaFormacionUseCase } from './application/use-cases/crear-programa-formacion.usecase';
import { ActualizarProgramaFormacionUseCase } from './application/use-cases/actualizar-programa-formacion.usecase';
import { EliminarProgramaFormacionUseCase } from './application/use-cases/eliminar-programa-formacion.usecase';


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