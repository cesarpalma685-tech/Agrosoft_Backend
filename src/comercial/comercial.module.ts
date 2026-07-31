import { Module } from '@nestjs/common';
import { VentasModule } from './ventas/ventas.module';
import { VentasDetallesModule } from './ventas_detalles/ventas_detalles.module';
import { FacturasModule } from './factura/factura.module';
import { PagosModule } from './pagos/pagos.module';
import { TransaccionesFinancierasModule } from './transacciones_financieras/transacciones_financieras.module';
import { HistorialPreciosLoteModule } from './historial_precios_lote/historial_precios_lote.module';

@Module({
  imports: [VentasModule, VentasDetallesModule, FacturasModule, PagosModule, TransaccionesFinancierasModule, HistorialPreciosLoteModule]
})
export class ComercialModule {}
