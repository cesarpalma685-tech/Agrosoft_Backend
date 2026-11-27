import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VentaController } from "./infrastructure/controller/venta.controller";
import { VentaOrmEntity } from "./infrastructure/persistence/venta.orm-entity";
import { VentaRepositoryPort } from "./application/ports/venta.repository.ports";
import { VentaTypeOrmRepository } from "./infrastructure/repositories/venta.typeorm.repository";
import { ConsultarVentasUseCase } from "./application/use-cases/consultar-ventas.use-case";
import { RegistrarVentaUseCase } from "./application/use-cases/registrar-venta.use-case";
import { RegistrarPagoVentaUseCase } from "./application/use-cases/registrar-pago-venta.use-case";
import { AnularVentaUseCase } from "./application/use-cases/anular-venta.use-case";
import { ClienteModule } from "../../identidad/clientes/clientes.module";
import { LoteProduccionModule } from "../../produccion/lote-produccion/lote-produccion.module";
import { MovimientoProduccionModule } from "../../produccion/movimiento-produccion/movimiento-produccion.module";
import { VentasDetallesModule } from "../ventas_detalles/ventas_detalles.module";
import { PagosModule } from "../pagos/pagos.module";
import { FacturasModule } from "../factura/factura.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([VentaOrmEntity]),
    ClienteModule,
    LoteProduccionModule,
    MovimientoProduccionModule,
    VentasDetallesModule,
    PagosModule,
    FacturasModule,
  ],
  controllers: [VentaController],
  providers: [
    ConsultarVentasUseCase,
    RegistrarVentaUseCase,
    RegistrarPagoVentaUseCase,
    AnularVentaUseCase,
    { provide: VentaRepositoryPort, useClass: VentaTypeOrmRepository },
  ],
  exports: [VentaRepositoryPort],
})
export class VentasModule {}
