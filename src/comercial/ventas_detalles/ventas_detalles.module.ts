import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaDetalleOrmEntity } from './infrastructure/persistence/venta-detalle.orm-entity';
import { VentaDetalleController } from './infrastructure/controller/venta-detalle.controller';
import { VentaDetalleRepositoryPort } from './application/ports/venta-detalle.repository.port';
import { CrearVentaDetalleUseCase } from './application/use-cases/crear-venta-detalle.use-case';
import { ListarVentasDetallesUseCase } from './application/use-cases/listar-ventas-detalles.use-case';
import { ActualizarVentaDetalleUseCase } from './application/use-cases/actualizar-venta-detalle.use-case';
import { ObtenerVentaDetallePorIdUseCase } from './application/use-cases/obtener-venta-detalle.use-case';
import { EliminarVentaDetalleUseCase } from './application/use-cases/eliminar.venta-detalle.use-case';
import { VentaDetalleTypeOrmRepository } from './infrastructure/repositories/venta-detalle.typeorm.entity';

@Module({
    imports: [TypeOrmModule.forFeature([VentaDetalleOrmEntity])],
    controllers: [VentaDetalleController],
    providers: [
    CrearVentaDetalleUseCase,
    ListarVentasDetallesUseCase,
    ObtenerVentaDetallePorIdUseCase,
    ActualizarVentaDetalleUseCase,
    EliminarVentaDetalleUseCase,
    {
        provide: VentaDetalleRepositoryPort,
        useClass: VentaDetalleTypeOrmRepository,
    },
    ],
    exports: [VentaDetalleRepositoryPort],
})
export class VentasDetallesModule {}
