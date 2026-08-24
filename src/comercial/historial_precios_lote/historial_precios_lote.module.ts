import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialPrecioLoteOrmEntity } from './infrastructure/persistence/historial-precio-lote.orm-entity';
import { HistorialPrecioLoteController } from './infrastructure/controller/historial-precio-lote.controller';
import { CrearHistorialPrecioLoteUseCase } from './application/use-cases/crear-historial-precio-lote.use-case';
import { ListarHistorialPreciosLoteUseCase } from './application/use-cases/listar-historial-precios-lote.use-case';
import { ObtenerHistorialPrecioLotePorIdUseCase } from './application/use-cases/obtener-historial-precio-lote.use-case';
import { ActualizarHistorialPrecioLoteUseCase } from './application/use-cases/actualizar-historial-precio-lote.use-case';
import { EliminarHistorialPrecioLoteUseCase } from './application/use-cases/eliminar-historial-precio-lote.use-case';
import { HistorialPrecioLoteRepositoryPort } from './application/ports/historial-precio-lote.repository.port';
import { HistorialPrecioLoteTypeOrmRepository } from './infrastructure/repositories/historial-precio-lote.typeorm.repository';

@Module({
    imports:[TypeOrmModule.forFeature([HistorialPrecioLoteOrmEntity])],
    controllers:[HistorialPrecioLoteController],
    providers:[
        CrearHistorialPrecioLoteUseCase,
        ListarHistorialPreciosLoteUseCase,
        ObtenerHistorialPrecioLotePorIdUseCase,
        ActualizarHistorialPrecioLoteUseCase,
        EliminarHistorialPrecioLoteUseCase,
        {
            provide:HistorialPrecioLoteRepositoryPort,
            useClass:HistorialPrecioLoteTypeOrmRepository
        },
    ],
    exports:[HistorialPrecioLoteRepositoryPort]
})
export class HistorialPreciosLoteModule {}
