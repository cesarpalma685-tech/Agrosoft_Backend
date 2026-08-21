import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoFormacionOrmEntity } from './infraestructure/persistence/tipo-formacion.orm-entity';
import { TipoFormacionTypeOrmRepository } from './infraestructure/repositories/tipo-formacion-typeorm.repository';
import { TIPO_FORMACION_REPOSITORY } from './aplication/ports/tipo-formacion.repository';
import { TiposFormacionController } from './infraestructure/controllers/tipos-formacion.controller';

import { CrearTipoFormacionUseCase } from './aplication/use-cases/crear-tipo-formacion.usecase';
import { ActualizarTipoFormacionUseCase } from './aplication/use-cases/actualizar-tipo-formacion.usecase';
import { EliminarTipoFormacionUseCase } from './aplication/use-cases/eliminar-tipo-formacion.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TipoFormacionOrmEntity])],
  controllers: [TiposFormacionController],
  providers: [
    CrearTipoFormacionUseCase,
    ActualizarTipoFormacionUseCase,
    EliminarTipoFormacionUseCase,
    { provide: TIPO_FORMACION_REPOSITORY, useClass: TipoFormacionTypeOrmRepository },
  ],
  exports: [TIPO_FORMACION_REPOSITORY],
})
export class TiposFormacionModule {}