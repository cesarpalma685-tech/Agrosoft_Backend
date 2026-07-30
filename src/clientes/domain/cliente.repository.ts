import { Cliente } from './cliente.entity';

export abstract class ClienteRepository {
  abstract crear(cliente: Cliente): Promise<Cliente>;
  abstract actualizar(cliente: Cliente): Promise<Cliente>;
  abstract eliminar(id: number): Promise<void>;
  abstract buscarPorId(id: number): Promise<Cliente | null>;
}