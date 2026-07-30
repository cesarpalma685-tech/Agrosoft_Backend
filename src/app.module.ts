import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolModule} from './roles/roles.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('DB_PASSWORD:', config.get('DB_PASSWORD'));
        console.log('typeof:', typeof config.get('DB_PASSWORD'));
        console.log('DB_HOST:', config.get('DB_HOST'));
        console.log('DB_PORT:', config.get('DB_PORT'));
        console.log('DB_USERNAME:', config.get('DB_USERNAME'));
        console.log('DB_NAME:', config.get('DB_NAME'));

        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),

    UsuariosModule,RolModule,
  ],
})
export class AppModule {}