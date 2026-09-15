import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransaccionFinancieraOrmEntity } from "./infrastructure/persistence/transaccion-financiera.orm-entity";
import { TransaccionFinancieraController } from "./infrastructure/controller/transaccion-financiera.controller";
import { CrearTransaccionFinancieraUseCase } from "./application/use-cases/crear-transaccion-financiera.use-case";
import { ListarTransaccionesFinancierasUseCase } from "./application/use-cases/listar-transacciones-financieras.use-case";
import { ObtenerTransaccionFinancieraPorIdUseCase } from "./application/use-cases/obtener-transaccion-financiera.use-case";
import { ActualizarTransaccionFinancieraUseCase } from "./application/use-cases/actualizar-transaccion-financiera.use-case";
import { EliminarTransaccionFinancieraUseCase } from "./application/use-cases/eliminar-transaccion-financiera.use-case";
import { TransaccionFinancieraRepositoryPort } from "./application/ports/crear-transaccion-financiera.repository.port";
import { TransaccionFinancieraTypeOrmRepository } from "./infrastructure/repositories/transaccion-financiera.typeorm.repository";

@Module({
  imports: [TypeOrmModule.forFeature([TransaccionFinancieraOrmEntity])],
  controllers: [TransaccionFinancieraController],
  providers: [
    CrearTransaccionFinancieraUseCase,
    ListarTransaccionesFinancierasUseCase,
    ObtenerTransaccionFinancieraPorIdUseCase,
    ActualizarTransaccionFinancieraUseCase,
    EliminarTransaccionFinancieraUseCase,
    {
      provide: TransaccionFinancieraRepositoryPort,
      useClass: TransaccionFinancieraTypeOrmRepository,
    },
  ],
  exports: [TransaccionFinancieraRepositoryPort],
})
export class TransaccionesFinancierasModule {}
