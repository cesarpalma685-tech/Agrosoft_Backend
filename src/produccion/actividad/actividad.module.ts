import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActividadController } from "./infrastructure/controllers/actividad.controller";
import { CrearActividadUseCase } from "./application/use-cases/crear-actividad.use-case";
import { ListarActividadUseCase } from "./application/use-cases/listar-actividad.use-case";
import { CompletarActividadUseCase } from "./application/use-cases/completar-actividad.use-case";
import { MovimientoInsumoModule } from "../../inventario/movimientos_isumos/movimientos_isumos.module";
import { ActividadesInsumoUsoModule } from "../../actividades_detalles/actividades_insumos_uso/actividades_insumos_uso.module";
import { UsosHerramientasModule } from "../../actividades_detalles/usos_herramientas/usos_herramientas.module";
import { RegistrarServicioUseCase } from "./application/use-cases/registrar-servicio.use-case";
import { ActividadesServiciosModule } from "../../actividades_detalles/actividades_servicios/actividades_servicios.module";
import { ActualizarActividadUseCase } from "./application/use-cases/actualizar-actividad.use-case";
import { ActividadRepositoryPort } from "./application/ports/actividad.repository.port";
import { ActividadTypeOrmRepository } from "./infrastructure/repositories/actividad.typeorm.repository";
import { ActividadOrmEntity } from "./infrastructure/persistence/actividad.orm-entity";
import { CultivoModule } from "../cultivo/cultivo.module";
import { InsumoModule } from "../../inventario/insumos/insumos.module";
import { ActividadesResponsablesModule } from "../../actividades_detalles/actividades_responsable/actividades_responsable.module";
import { ActividadesHistorialModule } from "../../actividades_detalles/actividades_historial/actividades_historial.module";
import { ActividadesInsumosReservaModule } from "../../actividades_detalles/actividades_insumos_reversa/actividades_insumos_reversa.module";
import { ActividadesHerramientasModule } from "../../actividades_detalles/actividades_herramientas/actividades_herramientas.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ActividadOrmEntity]),
    CultivoModule,
    InsumoModule,
    ActividadesResponsablesModule,
    ActividadesHistorialModule,
    ActividadesInsumosReservaModule,
    ActividadesHerramientasModule,
    MovimientoInsumoModule,
    ActividadesInsumoUsoModule,
    UsosHerramientasModule,
    ActividadesServiciosModule,
  ],
  controllers: [ActividadController],
  providers: [
    CrearActividadUseCase,
    ListarActividadUseCase,
    ActualizarActividadUseCase,
    CompletarActividadUseCase,
    RegistrarServicioUseCase,
    { provide: ActividadRepositoryPort, useClass: ActividadTypeOrmRepository },
  ],
  exports: [ActividadRepositoryPort],
})
export class ActividadModule {}
