import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultivoController } from './infrastructure/http/cultivo.controller';
import { CreateCultivoUseCase } from './application/create-cultivo.use-case';
import { ListCultivoUseCase } from './application/list-cultivo.use-case';
import { CULTIVO_REPOSITORY } from './domain/cultivo-repository.port';
import { CultivoTypeOrmRepository } from './infrastructure/persistence/cultivo-typeorm.repository';
import { CultivoOrmEntity } from './infrastructure/persistence/cultivo.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CultivoOrmEntity])],
  controllers: [CultivoController],
  providers: [
    CreateCultivoUseCase,
    ListCultivoUseCase,
    {
      provide: CULTIVO_REPOSITORY,
      useClass: CultivoTypeOrmRepository,
    },
  ],
})
export class CultivoModule {}