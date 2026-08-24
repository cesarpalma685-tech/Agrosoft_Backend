import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaOrmEntity } from './infrastructure/persistence/venta.orm-entity';
import { VentaController } from './infrastructure/controller/venta.controller';
import { VentaTypeOrmRepository } from './infrastructure/repositories/venta.typeorm.repository';
import { CrearVentaUseCase } from './application/use-cases/crear-venta.use-case';
import { ListarVentasUseCase } from './application/use-cases/listar-ventas.use-case';
import { ActualizarVentaUseCase } from './application/use-cases/actualizar-venta.use-case';
import { EliminarVentaUseCase } from './application/use-cases/eliminar-venta.use-case';
import { ObtenerVentaPorIdUseCase } from './application/use-cases/obtener-venta.use-case';
import { VentaRepositoryPort } from './application/ports/venta.repository.ports';

@Module({
  imports: [TypeOrmModule.forFeature([VentaOrmEntity])],
  controllers: [VentaController],
  providers: [
    CrearVentaUseCase,
    ListarVentasUseCase,
    ObtenerVentaPorIdUseCase,
    ActualizarVentaUseCase,
    EliminarVentaUseCase,
    {
      provide: VentaRepositoryPort,
      useClass: VentaTypeOrmRepository,
    },
  ],
  exports: [VentaRepositoryPort],
})
export class VentasModule {}
