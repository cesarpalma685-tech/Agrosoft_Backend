import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailCodeOrmEntity } from './infrastructure/persistence/mail-codes.orm-entity';
import { EmailCodeTypeOrmRepository } from './infrastructure/persistence/mail-codes-typeorm.repository';

import { EmailCodeRepository } from './domain/mail-codes.repository';

import { EmailCodesController } from './infrastructure/http/mail-codes.controller';

import { CrearEmailCodeUseCase } from './application/use-cases/crear-mail-codes.usecase';
import { ActualizarEmailCodeUseCase } from './application/use-cases/actualizar-mail-codes.usecase';
import { EliminarEmailCodeUseCase } from './application/use-cases/eliminar-mail-codes.usecase';

@Module({
imports: [
    TypeOrmModule.forFeature([
    EmailCodeOrmEntity,
    ]),
],
controllers: [
    EmailCodesController,
],
providers: [
    CrearEmailCodeUseCase,
    ActualizarEmailCodeUseCase,
    EliminarEmailCodeUseCase,
    {
provide: EmailCodeRepository,
useClass: EmailCodeTypeOrmRepository,
    },
],
exports: [
    EmailCodeRepository,
],
})
export class EmailCodeModule {}