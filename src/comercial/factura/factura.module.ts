import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaOrmEntity } from './infrastructure/persistence/factura.orm-entity';
import { FacturaController } from './infrastructure/controller/factura.controller';
import { FacturaRepositoryPort } from './application/ports/factura.repository.port';
import { FacturaTypeOrmRepository } from './infrastructure/repositories/factura.typeorm.repository';
import { CrearFacturaUseCase } from './application/use-cases/crear-factura.use-case';
import { ListarFacturasUseCase } from './application/use-cases/listar-facturas.use-case';
import { ActualizarFacturaUseCase } from './application/use-cases/actualizar-factura.use-case';
import { EliminarFacturaUseCase } from './application/use-cases/eliminar-factura.use-case';
import { ObtenerFacturaPorIdUseCase } from './application/use-cases/obtener-factura.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([FacturaOrmEntity])],
    controllers: [FacturaController],
    providers: [
    CrearFacturaUseCase,
    ListarFacturasUseCase,
    ObtenerFacturaPorIdUseCase,
    ActualizarFacturaUseCase,
    EliminarFacturaUseCase,
    {
        provide: FacturaRepositoryPort,
        useClass: FacturaTypeOrmRepository,
    },
    ],
    exports: [FacturaRepositoryPort],
})
export class FacturasModule {}
