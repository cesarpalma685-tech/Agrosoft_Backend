import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormacionModule } from './formacion/formacion.module';
import { IdentidadModule } from './identidad/identidad.module';
import { ProduccionModule } from './produccion/produccion.module';
import { WikiAgronomiaModule } from './wiki_agronomia/wiki_agronomia.module';
import { CatalogosModule } from './catalogos/catalogos.module';
import { IotModule } from './iot/iot.module';
import { TerritorioModule } from './territorio/territorio.module';

@Module({
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432') ,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    FormacionModule,
    IdentidadModule,
    ProduccionModule,
    WikiAgronomiaModule,
    CatalogosModule,
    IotModule,
    TerritorioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
