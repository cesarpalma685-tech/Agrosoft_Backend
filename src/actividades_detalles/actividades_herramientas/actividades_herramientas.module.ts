import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadHerramientaOrmEntity } from './infrastructure/persistence/actividad-herramienta.orm-entity';

import { ActividadHerramientaRepositoryPort } from './application/ports/actividad-herramienta.repository.port';
import { ActividadHerramientaTypeOrmRepository } from './infrastructure/repositories/actividad-herramienta.typeorm.repository';
import { CrearActividadHerramientaUseCase } from './application/use-cases/registrar-herramienta.use-case';
import { ListarActividadHerramientasUseCase } from './application/use-cases/listar-herramientas-por-actividad.use-case';
import { ActividadHerramientaController } from './infrastructure/controller/actividad-herramienta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadHerramientaOrmEntity])],
  controllers: [ActividadHerramientaController],
  providers: [
    CrearActividadHerramientaUseCase,
    ListarActividadHerramientasUseCase,
    {
      provide: ActividadHerramientaRepositoryPort,
      useClass: ActividadHerramientaTypeOrmRepository,
    },
  ],
  exports: [ActividadHerramientaRepositoryPort],
})
export class ActividadesHerramientasModule {}
