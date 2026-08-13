import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultivoHistorialController } from './infrastructure/http/cultivo-historial.controller';
import { CreateCultivoHistorialUseCase } from './application/create-cultivo-historial.use-case';
import { ListCultivoHistorialUseCase } from './application/list-cultivo-historial.use-case';
import { CULTIVO_HISTORIAL_REPOSITORY } from './domain/cultivo-historial-repository.port';
import { CultivoHistorialTypeOrmRepository } from './infrastructure/persistence/cultivo-historial-typeorm.repository';
import { CultivoHistorialOrmEntity } from './infrastructure/persistence/cultivo-historial.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CultivoHistorialOrmEntity])],
  controllers: [CultivoHistorialController],
  providers: [
    CreateCultivoHistorialUseCase,
    ListCultivoHistorialUseCase,
    {
      provide: CULTIVO_HISTORIAL_REPOSITORY,
      useClass: CultivoHistorialTypeOrmRepository,
    },
  ],
})
export class CultivoHistorialModule {}