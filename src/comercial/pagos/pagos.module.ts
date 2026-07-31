import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagoOrmEntity } from './infrastructure/persistence/pago.orm-entity';
import { PagoController } from './infrastructure/controller/pago.controller';
import { CrearPagoUseCase } from './application/use-cases/crear-pago.use-case';
import { ListarPagosUseCase } from './application/use-cases/listar-pagos.use-case';
import { ObtenerPagoPorIdUseCase } from './application/use-cases/obtener-pago.use-case';
import { ActualizarPagoUseCase } from './application/use-cases/actualizar-pago.use-case';
import { EliminarPagoUseCase } from './application/use-cases/eliminar-pago.use-case';
import { PagoRepositoryPort } from './application/ports/pago.repository.port';
import { PagoTypeOrmRepository } from './infrastructure/repositories/pago.typeorm.repository';

@Module({
    imports:[TypeOrmModule.forFeature([PagoOrmEntity])],
    controllers:[PagoController],
    providers:[
        CrearPagoUseCase,
        ListarPagosUseCase,
        ObtenerPagoPorIdUseCase,
        ActualizarPagoUseCase,
        EliminarPagoUseCase,
    {
        provide: PagoRepositoryPort,
        useClass: PagoTypeOrmRepository,},
    ],
    exports:[PagoRepositoryPort]
})
export class PagosModule {}
