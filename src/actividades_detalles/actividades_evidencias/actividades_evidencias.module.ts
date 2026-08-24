import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEvidenciaOrmEntity } from './infrastructure/persistence/actividad-evidencia.orm-entity';

import { ActividadEvidenciaRepositoryPort } from './application/ports/actividad-evidencia.repository.port';
import { ActividadEvidenciaTypeOrmRepository } from './infrastructure/repositories/actividad-evidencia.typeorm.repository';
import { CrearActividadEvidenciaUseCase } from './application/use-cases/registrar-evidencia.use-case';
import { ListarActividadEvidenciasUseCase } from './application/use-cases/listar-evidencias-por-actividad.use-case';
import { ActividadEvidenciaController } from './infrastructure/controller/actividades_evidencias.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ActividadEvidenciaOrmEntity])],
  controllers: [ActividadEvidenciaController],
  providers: [
    CrearActividadEvidenciaUseCase,
    ListarActividadEvidenciasUseCase,
    {
      provide: ActividadEvidenciaRepositoryPort,
      useClass: ActividadEvidenciaTypeOrmRepository,
    },
  ],
  exports: [ActividadEvidenciaRepositoryPort],
})
export class ActividadesEvidenciasModule {}
