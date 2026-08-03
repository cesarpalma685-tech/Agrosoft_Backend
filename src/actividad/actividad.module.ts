import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadController } from './infrastructure/http/actividad.controller';
import { CreateActividadUseCase } from './application/create-actividad.use-case';
import { ListActividadUseCase } from './application/list-actividad.use-case';
import { ACTIVIDAD_REPOSITORY } from './domain/actividad-repository.port';
import { ActividadTypeOrmRepository } from './infrastructure/persistence/actividad-typeorm.repository';
import { ActividadOrmEntity } from './infrastructure/persistence/actividad.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActividadOrmEntity])],
  controllers: [ActividadController],
  providers: [
    CreateActividadUseCase,
    ListActividadUseCase,
    {
      provide: ACTIVIDAD_REPOSITORY,
      useClass: ActividadTypeOrmRepository,
    },
  ],
})
export class ActividadModule {}