import { Module } from '@nestjs/common';
import { MovimientoProduccionModule } from './movimiento-produccion/movimiento-produccion.module';
import { LoteProduccionModule } from './lote-produccion/lote-produccion.module';
import { EpaModule } from './epa/epa.module';
import { CultivoHistorialModule } from './cultivo-historial/cultivo-historial.module';
import { CultivoModule } from './cultivo/cultivo.module';
import { ActividadModule } from './actividad/actividad.module';

@Module({
    imports:[MovimientoProduccionModule, LoteProduccionModule, EpaModule, CultivoHistorialModule, CultivoModule, ActividadModule]
})
export class ProducciónModule {}
