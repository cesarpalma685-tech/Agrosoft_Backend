import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoFormacionOrmEntity } from './infrastructure/persistence/tipo-formacion.orm-entity';
import { TipoFormacionTypeOrmRepository } from './infrastructure/persistence/tipo-formacion-typeorm.repository';
import { TIPO_FORMACION_REPOSITORY } from './domain/tipo-formacion.repository';
import { TiposFormacionController } from './infrastructure/http/tipos-formacion.controller';
import { CrearTipoFormacionUseCase } from './application/use-cases/crear-tipo-formacion.usecase';
import { ActualizarTipoFormacionUseCase } from './application/use-cases/actualizar-tipo-formacion.usecase';
import { EliminarTipoFormacionUseCase } from './application/use-cases/eliminar-tipo-formacion.usecase';

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
