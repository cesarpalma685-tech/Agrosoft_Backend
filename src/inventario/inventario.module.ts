import { Module } from '@nestjs/common';
import { InsumoModule } from './insumos/insumos.module';
import { AlmacenModule } from './almacenes/almacenes.module';
import { MovimientoInsumoModule } from './movimientos_isumos/movimientos_isumos.module';
import { ReservasModule } from './reservas/reservas.module';
@Module({
  imports: [InsumoModule, AlmacenModule, MovimientoInsumoModule, ReservasModule]
})
export class InventarioModule {}
