import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EpaModule } from './epa/epa.module';
import { CultivoModule } from './cultivo/cultivo.module';
import { CultivoHistorialModule } from './cultivo-historial/cultivo-historial.module';
import { WikiTipoEpaModule } from './wiki-tipo-epa/wiki-tipo-epa.module';
import { TipoCultivoWikiModule } from './tipo-cultivo-wiki/tipo-cultivo-wiki.module';
import { ActividadModule } from './actividad/actividad.module';
import { LoteProduccionModule } from './lote-produccion/lote-produccion.module';
import { MovimientoProduccionModule } from './movimiento-produccion/movimiento-produccion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'agrosoft_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EpaModule,
    CultivoModule,
    CultivoHistorialModule,
    WikiTipoEpaModule,
    TipoCultivoWikiModule,
    ActividadModule,
    LoteProduccionModule,
    MovimientoProduccionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}