import { Module } from '@nestjs/common';
import { ActividadesEvidenciasModule } from './actividades_evidencias/actividades_evidencias.module';
import { ActividadesHerramientasModule } from './actividades_herramientas/actividades_herramientas.module';
import { ActividadesServiciosModule } from './actividades_servicios/actividades_servicios.module';
import { ActividadesInsumosUsoModule } from './actividades_insumos_uso/actividades_insumos_uso.module';
import { ActividadesInsumosReservaModule } from './actividades_insumos_reversa/actividades_insumos_reversa.module';
import { ActividadesResponsablesModule } from './actividades_responsable/actividades_responsable.module';
import { ActividadesHistorialModule } from './actividades_historial/actividades_historial.module';

@Module({
  imports: [
    ActividadesEvidenciasModule,
    ActividadesHerramientasModule,
    ActividadesServiciosModule,
    ActividadesInsumosUsoModule,
    ActividadesInsumosReservaModule,
    ActividadesResponsablesModule,
    ActividadesHistorialModule,
  ],
})
export class ActividesDetallesModule {}
