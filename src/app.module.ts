import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogosModule } from './catalogos/catalogos.module';
import { IotModule } from './iot/iot.module';
import { TerritorioModule } from './territorio/territorio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const dbConfig = {
          type: 'postgres' as const,
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<string>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: 'postgres',
          database: configService.get<string>('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };

        console.log('CONFIGURACIÓN DB:', {
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password ? 'CARGADA' : 'VACÍA',
          database: dbConfig.database,
        });

        return dbConfig;
      },
    }),

    CatalogosModule, IotModule, TerritorioModule,
  ],
})
export class AppModule {}