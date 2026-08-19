import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramaFormacionOrmEntity } from '../../src/programas-formacion/infraestructure/persistence/programa-formacion.orm-entity';
import { ProgramaFormacionTypeOrmRepository } from '../../src/programas-formacion/infraestructure/repositories/programa-formacion-typeorm.repository';

import { ProgramaFormacionRepository } from './aplication/ports/programa-formacion.repository';

import { ProgramasFormacionController } from './infraestructure/controllers/programas-formacion.controller';

import { CrearProgramaFormacionUseCase } from '../../src/programas-formacion/aplication/use-cases/crear-programa-formacion.usecase';
import { ActualizarProgramaFormacionUseCase } from '../../src/programas-formacion/aplication/use-cases/actualizar-programa-formacion.usecase';
import { EliminarProgramaFormacionUseCase } from '../../src/programas-formacion/aplication/use-cases/eliminar-programa-formacion.usecase';


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