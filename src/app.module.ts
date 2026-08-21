import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormacionModule } from './formacion/formacion.module';
import { IdentidadModule } from './identidad/identidad.module';

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
    IdentidadModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
