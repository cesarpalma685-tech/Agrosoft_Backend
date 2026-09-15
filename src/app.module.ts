import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IdentidadModule } from "./identidad/identidad.module";
import { ProduccionModule } from "./produccion/produccion.module";
import { WikiAgronomiaModule } from "./wiki_agronomia/wiki_agronomia.module";
import { IotModule } from "./iot/iot.module";
import { TerritorioModule } from "./territorio/territorio.module";
import { ComercialModule } from "./comercial/comercial.module";
import { InventarioModule } from "./inventario/inventario.module";
import { FormacionModule } from "./formacion/formacion.module";
import { CatalogosModule } from "./catalogos/catalogos.module";
import { ProduccionActividadesModule } from "./actividades_detalles/produccion_actividades.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? "5432"),
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
    TerritorioModule,
    ComercialModule,
    InventarioModule,
    ProduccionActividadesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
