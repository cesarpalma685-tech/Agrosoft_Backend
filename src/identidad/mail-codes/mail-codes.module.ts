import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailCodeOrmEntity } from './infraestructure/persistence/mail-codes.orm-entity';
import { EmailCodeTypeOrmRepository } from './infraestructure/repositories/mail-codes-typeorm.repository';

import { EmailCodeRepository } from './aplication/ports/mail-codes.repository';

import { EmailCodesController } from './infraestructure/controllers/mail-codes.controller';

import { CrearEmailCodeUseCase } from './aplication/use-cases/crear-mail-codes.usecase';
import { ActualizarEmailCodeUseCase } from './aplication/use-cases/actualizar-mail-codes.usecase';
import { EliminarEmailCodeUseCase } from './aplication/use-cases/eliminar-mail-codes.usecase';

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
