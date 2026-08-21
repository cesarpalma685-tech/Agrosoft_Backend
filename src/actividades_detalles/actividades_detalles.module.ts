import { Module } from '@nestjs/common';
import { ActividadesResponsableModule } from './actividades_responsable/actividades_responsable.module';

@Module({
  imports: [ActividadesResponsableModule],
  controllers: [],
  providers: [],
})
export class ActividesDetallesModule {}
