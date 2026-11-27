import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransaccionFinancieraController } from "./infrastructure/controller/transaccion-financiera.controller";
import { TransaccionFinancieraOrmEntity } from "./infrastructure/persistence/transaccion-financiera.orm-entity";
import { TransaccionFinancieraRepositoryPort } from "./application/ports/crear-transaccion-financiera.repository.port";
import { TransaccionFinancieraTypeOrmRepository } from "./infrastructure/repositories/transaccion-financiera.typeorm.repository";
import { ListarTransaccionesUseCase, RegistrarTransaccionManualUseCase } from "./application/use-cases/transacciones.use-cases";
import { GenerarTransaccionesUseCase } from "./application/use-cases/generar-transacciones.use-case";
import { VentasModule } from "../ventas/ventas.module";
import { MovimientoInsumoModule } from "../../inventario/movimientos_isumos/movimientos_isumos.module";
import { InsumoModule } from "../../inventario/insumos/insumos.module";
import { ActividadModule } from "../../produccion/actividad/actividad.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([TransaccionFinancieraOrmEntity]),
    VentasModule,
    MovimientoInsumoModule,
    InsumoModule,
    ActividadModule,
  ],
  controllers: [TransaccionFinancieraController],
  providers: [
    ListarTransaccionesUseCase,
    RegistrarTransaccionManualUseCase,
    GenerarTransaccionesUseCase,
    { provide: TransaccionFinancieraRepositoryPort, useClass: TransaccionFinancieraTypeOrmRepository },
  ],
  exports: [TransaccionFinancieraRepositoryPort],
})
export class TransaccionesFinancierasModule {}
