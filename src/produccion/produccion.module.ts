import { Module } from "@nestjs/common";
import { ActividadModule } from "./actividad/actividad.module";
import { CultivoModule } from "./cultivo/cultivo.module";
import { CultivoHistorialModule } from "./cultivo-historial/cultivo-historial.module";
import { EpaModule } from "./epa/epa.module";
import { LoteProduccionModule } from "./lote-produccion/lote-produccion.module";
import { MovimientoProduccionModule } from "./movimiento-produccion/movimiento-produccion.module";

@Module({
  imports: [
    ActividadModule,
    CultivoModule,
    CultivoHistorialModule,
    EpaModule,
    LoteProduccionModule,
    MovimientoProduccionModule,
  ],
})
export class ProduccionModule {}
