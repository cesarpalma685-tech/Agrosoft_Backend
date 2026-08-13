import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResponsableOrmEntity } from './infrastructure/persistence/typeorm/entities/responsable.orm-entity';
import { HistorialOrmEntity } from './infrastructure/persistence/typeorm/entities/historial.orm-entity';
import { ServicioOrmEntity } from './infrastructure/persistence/typeorm/entities/servicio.orm-entity';
import { HerramientaAsignadaOrmEntity } from './infrastructure/persistence/typeorm/entities/herramienta-asignada.orm-entity';
import { UsoHerramientaOrmEntity } from './infrastructure/persistence/typeorm/entities/uso-herramienta.orm-entity';
import { ReservaInsumoOrmEntity } from './infrastructure/persistence/typeorm/entities/reserva-insumo.orm-entity';
import { UsoInsumoOrmEntity } from './infrastructure/persistence/typeorm/entities/uso-insumo.orm-entity';
import { InsumoActividadOrmEntity } from './infrastructure/persistence/typeorm/entities/insumo-actividad.orm-entity';
import { EvidenciaOrmEntity } from './infrastructure/persistence/typeorm/entities/evidencia.orm-entity';

import { ResponsableTypeOrmRepository } from './infrastructure/persistence/typeorm/repositories/responsable.typeorm-repository';
import { HistorialTypeOrmLogger } from './infrastructure/persistence/typeorm/repositories/historial.typeorm-logger';
import { ServicioTypeOrmRepository } from './infrastructure/persistence/typeorm/repositories/servicio.typeorm-repository';
import { HerramientaAsignadaTypeOrmRepository } from './infrastructure/persistence/typeorm/repositories/herramienta-asignada.typeorm-repository';
import { UsoHerramientaTypeOrmRepository } from './infrastructure/persistence/typeorm/repositories/uso-herramienta.typeorm-repository';
import { ReservaInsumoTypeOrmRepository } from './infrastructure/persistence/typeorm/repositories/reserva-insumo.typeorm-repository';
import { UsoInsumoTypeOrmRepository } from './infrastructure/persistence/typeorm/repositories/uso-insumo.typeorm-repository';
import { InsumoActividadTypeOrmRepository } from './infrastructure/persistence/typeorm/repositories/insumo-actividad.typeorm-repository';
import { EvidenciaTypeOrmRepository } from './infrastructure/persistence/typeorm/repositories/evidencia.typeorm-repository';

import { RESPONSABLE_REPOSITORY } from './domain/ports/responsable.repository.port';
import { HISTORIAL_LOGGER } from './domain/ports/historial-logger.port';
import { SERVICIO_REPOSITORY } from './domain/ports/servicio.repository.port';
import { HERRAMIENTA_ASIGNADA_REPOSITORY } from './domain/ports/herramienta-asignada.repository.port';
import { USO_HERRAMIENTA_REPOSITORY } from './domain/ports/uso-herramienta.repository.port';
import { RESERVA_INSUMO_REPOSITORY } from './domain/ports/reserva-insumo.repository.port';
import { USO_INSUMO_REPOSITORY } from './domain/ports/uso-insumo.repository.port';
import { INSUMO_ACTIVIDAD_REPOSITORY } from './domain/ports/insumo-actividad.repository.port';
import { EVIDENCIA_REPOSITORY } from './domain/ports/evidencia.repository.port';

import { AsignarResponsableUseCase } from './application/use-cases/responsables/asignar-responsable.use-case';
import { ListarResponsablesPorActividadUseCase } from './application/use-cases/responsables/listar-responsables-por-actividad.use-case';
import { AsignarServicioUseCase } from './application/use-cases/servicios/asignar-servicio.use-case';
import { ListarServiciosPorActividadUseCase } from './application/use-cases/servicios/listar-servicios-por-actividad.use-case';
import { AsignarHerramientaUseCase } from './application/use-cases/herramientas/asignar-herramienta.use-case';
import { ListarHerramientasPorActividadUseCase } from './application/use-cases/herramientas/listar-herramientas-por-actividad.use-case';
import { RegistrarUsoHerramientaUseCase } from './application/use-cases/usos-herramientas/registrar-uso-herramienta.use-case';
import { ListarUsosHerramientaPorActividadUseCase } from './application/use-cases/usos-herramientas/listar-usos-herramienta-por-actividad.use-case';
import { ReservarInsumoUseCase } from './application/use-cases/insumos-reserva/reservar-insumo.use-case';
import { ListarReservasPorActividadUseCase } from './application/use-cases/insumos-reserva/listar-reservas-por-actividad.use-case';
import { RegistrarUsoInsumoUseCase } from './application/use-cases/insumos-uso/registrar-uso-insumo.use-case';
import { ListarUsosInsumoPorActividadUseCase } from './application/use-cases/insumos-uso/listar-usos-insumo-por-actividad.use-case';
import { RegistrarInsumoActividadUseCase } from './application/use-cases/insumos/registrar-insumo-actividad.use-case';
import { ListarInsumosActividadPorActividadUseCase } from './application/use-cases/insumos/listar-insumos-actividad-por-actividad.use-case';
import { RegistrarEvidenciaUseCase } from './application/use-cases/evidencias/registrar-evidencia.use-case';
import { ListarEvidenciasPorActividadUseCase } from './application/use-cases/evidencias/listar-evidencias-por-actividad.use-case';
import { RegistrarHistorialUseCase } from './application/use-cases/historial/registrar-historial.use-case';
import { ListarHistorialPorActividadUseCase } from './application/use-cases/historial/listar-historial-por-actividad.use-case';

import { ResponsablesController } from './infrastructure/http/controllers/responsables.controller';
import { ServiciosController } from './infrastructure/http/controllers/servicios.controller';
import { HerramientasController } from './infrastructure/http/controllers/herramientas.controller';
import { UsosHerramientasController } from './infrastructure/http/controllers/usos-herramientas.controller';
import { InsumosReservaController } from './infrastructure/http/controllers/insumos-reserva.controller';
import { InsumosUsoController } from './infrastructure/http/controllers/insumos-uso.controller';
import { InsumosController } from './infrastructure/http/controllers/insumos.controller';
import { EvidenciasController } from './infrastructure/http/controllers/evidencias.controller';
import { HistorialController } from './infrastructure/http/controllers/historial.controller';

import { ActividadOrmEntity } from './infrastructure/persistence/typeorm/entities/actividad.orm-entity';
import { UsuarioOrmEntity } from './infrastructure/persistence/typeorm/entities/usuario.orm-entity';
import { InsumoOrmEntity } from './infrastructure/persistence/typeorm/entities/insumo.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResponsableOrmEntity,
      HistorialOrmEntity,
      ServicioOrmEntity,
      HerramientaAsignadaOrmEntity,
      UsoHerramientaOrmEntity,
      ReservaInsumoOrmEntity,
      UsoInsumoOrmEntity,
      InsumoActividadOrmEntity,
      EvidenciaOrmEntity,
      ActividadOrmEntity,
      UsuarioOrmEntity,
      InsumoOrmEntity,
    ]),
  ],
  controllers: [
    ResponsablesController,
    ServiciosController,
    HerramientasController,
    UsosHerramientasController,
    InsumosReservaController,
    InsumosUsoController,
    InsumosController,
    EvidenciasController,
    HistorialController,
  ],
  providers: [
    AsignarResponsableUseCase,
    ListarResponsablesPorActividadUseCase,
    {
      provide: RESPONSABLE_REPOSITORY,
      useClass: ResponsableTypeOrmRepository,
    },
    {
      provide: HISTORIAL_LOGGER,
      useClass: HistorialTypeOrmLogger,
    },
    AsignarServicioUseCase,
    ListarServiciosPorActividadUseCase,
    {
      provide: SERVICIO_REPOSITORY,
      useClass: ServicioTypeOrmRepository,
    },
    AsignarHerramientaUseCase,
    ListarHerramientasPorActividadUseCase,
    {
      provide: HERRAMIENTA_ASIGNADA_REPOSITORY,
      useClass: HerramientaAsignadaTypeOrmRepository,
    },
    RegistrarUsoHerramientaUseCase,
    ListarUsosHerramientaPorActividadUseCase,
    {
      provide: USO_HERRAMIENTA_REPOSITORY,
      useClass: UsoHerramientaTypeOrmRepository,
    },
    ReservarInsumoUseCase,
    ListarReservasPorActividadUseCase,
    {
      provide: RESERVA_INSUMO_REPOSITORY,
      useClass: ReservaInsumoTypeOrmRepository,
    },
    RegistrarUsoInsumoUseCase,
    ListarUsosInsumoPorActividadUseCase,
    {
      provide: USO_INSUMO_REPOSITORY,
      useClass: UsoInsumoTypeOrmRepository,
    },
    RegistrarInsumoActividadUseCase,
    ListarInsumosActividadPorActividadUseCase,
    {
      provide: INSUMO_ACTIVIDAD_REPOSITORY,
      useClass: InsumoActividadTypeOrmRepository,
    },
    RegistrarEvidenciaUseCase,
    ListarEvidenciasPorActividadUseCase,
    {
      provide: EVIDENCIA_REPOSITORY,
      useClass: EvidenciaTypeOrmRepository,
    },
    RegistrarHistorialUseCase,
    ListarHistorialPorActividadUseCase,
  ],
})
export class ActividadesModule {}