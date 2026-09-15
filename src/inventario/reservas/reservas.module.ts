import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReservaOrmEntity } from "./infrastructure/persistence/reserva.orm-entity";
import { ReservaController } from "./infrastructure/controllers/reservas.controller";
import { CrearReservaUseCase } from "./aplication/use-cases/crear-reserva.use-case";
import { ListarReservasUseCase } from "./aplication/use-cases/listar-reservas.use-case";
import { ObtenerReservaPorIdUseCase } from "./aplication/use-cases/obtener-reserva.use-case";
import { ActualizarReservaUseCase } from "./aplication/use-cases/actualizar-reserva.use-case";
import { EliminarReservaUseCase } from "./aplication/use-cases/eliminar-reserva.use-case";
import { ReservaRepositoryPort } from "./aplication/ports/reserva.repository.port";
import { ReservaTypeOrmRepository } from "./infrastructure/repositories/reserva.typeorm.repository";
@Module({
  imports: [TypeOrmModule.forFeature([ReservaOrmEntity])],
  controllers: [ReservaController],
  providers: [
    CrearReservaUseCase,
    ListarReservasUseCase,
    ObtenerReservaPorIdUseCase,
    ActualizarReservaUseCase,
    EliminarReservaUseCase,
    {
      provide: ReservaRepositoryPort,
      useClass: ReservaTypeOrmRepository,
    },
  ],
  exports: [ReservaRepositoryPort],
})
export class ReservasModule {}
