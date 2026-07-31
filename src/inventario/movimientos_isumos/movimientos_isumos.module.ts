import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoInsumoOrmEntity } from './infrastructure/persistence/movimiento-insumo.orm-entity';
import { MovimientoInsumoController } from './infrastructure/controllers/movimiento-insumo.controller';
import { RegistrarMovimientoInsumoUseCase } from './application/use-cases/crear-movimiento-insumo.use-case';
import { MovimientoInsumoRepositoryPort } from './application/ports/crear-movimiento-insumo.repository.port';
import { MovimientoInsumoTypeOrmRepository } from './infrastructure/repositories/movimiento-insumo.typeorm.repository';
import { ListarMovimientosInsumosUseCase } from './application/use-cases/listar-movimientos-insumos.use-case';
import { ObtenerMovimientoInsumoPorIdUseCase } from './application/use-cases/obtener-movimiento-insumo-por-id.use-case';
import { ActualizarMovimientoInsumoUseCase } from './application/use-cases/actualizar-movimiento-insumo.use-case';
import { EliminarMovimientoInsumoUseCase } from './application/use-cases/eliminar-movimiento-insumo.use-case';
@Module({
  imports: [TypeOrmModule.forFeature([MovimientoInsumoOrmEntity])],
  controllers: [MovimientoInsumoController],
  providers: [
  RegistrarMovimientoInsumoUseCase,
  ListarMovimientosInsumosUseCase,
  ObtenerMovimientoInsumoPorIdUseCase,
  ActualizarMovimientoInsumoUseCase,
  EliminarMovimientoInsumoUseCase,
  {
    provide: MovimientoInsumoRepositoryPort,
    useClass: MovimientoInsumoTypeOrmRepository,
  },
],
  exports: [MovimientoInsumoRepositoryPort],
})
export class MovimientoInsumoModule {}