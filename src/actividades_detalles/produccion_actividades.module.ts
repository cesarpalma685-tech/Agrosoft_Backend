import { Module } from '@nestjs/common';
import { ActividadesHistorialModule } from './actividades_historial/actividades_historial.module';
import { ActividadInsumosModule } from './actividades_insumos/actividades_insumos.module';
import { ActividadesEvidenciasModule } from './actividades_evidencias/actividades_evidencias.module';
import { ActividadesHerramientasModule } from './actividades_herramientas/actividades_herramientas.module';
import { ActividadesInsumosReservaModule } from './actividades_insumos_reversa/actividades_insumos_reversa.module';
import { ActividadesInsumoUsoModule } from './actividades_insumos_uso/actividades_insumos_uso.module';
import { ActividadesResponsablesModule } from './actividades_responsable/actividades_responsable.module';
import { ActividadesServiciosModule } from './actividades_servicios/actividades_servicios.module';
import { UsosHerramientasModule } from './usos_herramientas/usos_herramientas.module';

@Module({
  imports: [
    ActividadesHistorialModule,
    ActividadInsumosModule,
    ActividadesEvidenciasModule,
    ActividadesHerramientasModule,
    ActividadesInsumosReservaModule,
    ActividadesInsumoUsoModule,
    ActividadesResponsablesModule,
    ActividadesServiciosModule,
    UsosHerramientasModule,
  ],
})
export class ProduccionActividadesModule {}
