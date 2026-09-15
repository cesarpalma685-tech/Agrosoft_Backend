import { Reserva } from "../../domain/entities/crear-reserva.dto";

export abstract class ReservaRepositoryPort {
  abstract save(insumo: Reserva): Promise<Reserva>;
  abstract findById(id: number): Promise<Reserva | null>;
  abstract findAll(): Promise<Reserva[]>;
  abstract update(id: number, insumo: Partial<Reserva>): Promise<Reserva>;
  abstract softDelete(id: number): Promise<void>;
}
