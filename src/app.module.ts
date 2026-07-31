import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WikiTipoEpaModule } from './wiki-tipo-epa/wiki-tipo-epa.module';
import { TipoCultivoWikiModule } from './tipo-cultivo-wiki/tipo-cultivo-wiki.module';
import { EpaModule } from './epa/epa.module';
import { CultivoModule } from './cultivo/cultivo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/**/*.orm-entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    WikiTipoEpaModule,
    TipoCultivoWikiModule,
    EpaModule,
    CultivoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}