import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadHerramientaOrmEntity } from './infrastructure/persistence/actividad-herramienta.orm-entity';

import { ActividadHerramientaRepositoryPort } from './application/ports/actividad-herramienta.repository.port';
import { ActividadHerramientaTypeOrmRepository } from './infrastructure/repositories/actividad-herramienta.typeorm.repository';
import { AsignarHerramientaUseCase } from './application/use-cases/asignar-herramienta.use-case';
import { ListarHerramientasPorActividadUseCase } from './application/use-cases/listar-herramientas-por-actividad.use-case';
import { ActividadHerramientaController } from './infrastructure/controller/actividad-herramienta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadHerramientaOrmEntity])],
  controllers: [ActividadHerramientaController],
  providers: [
    AsignarHerramientaUseCase,
    ListarHerramientasPorActividadUseCase,
    {
      provide: ActividadHerramientaRepositoryPort,
      useClass: ActividadHerramientaTypeOrmRepository,
    },
  ],
  exports: [ActividadHerramientaRepositoryPort],
})
export class ActividadesHerramientasModule {}
