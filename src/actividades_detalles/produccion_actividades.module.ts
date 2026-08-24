import { Module } from '@nestjs/common';
import { ActividadesEvidenciasModule } from './actividades_evidencias/actividades_evidencias.module';
import { ActividadesHerramientasModule } from './actividades_herramientas/actividades_herramientas.module';
import { ActividadesHistorialModule } from './actividades_historial/actividades_historial.module';
import { ActividadInsumosModule } from './actividades_insumos/actividades_insumos.module';
import { ActividadesInsumosReservaModule } from './actividades_insumos_reversa/actividades_insumos_reversa.module';
import { ActividadInsumoUso } from './actividades_insumos_uso/domain/entities/actividad-insumo-uso.entity';

@Module({
  imports: [
    ActividadesEvidenciasModule,
    ActividadesHerramientasModule,
    ActividadesHistorialModule,
    ActividadInsumosModule,
    ActividadesInsumosReservaModule,
    ActividadInsumoUso,
  ],
})
export class Produccion_ActividadesModule {}
