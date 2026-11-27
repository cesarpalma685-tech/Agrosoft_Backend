import { Injectable } from "@nestjs/common";
import { Cliente } from "../../domain/entities/cliente.entity";
import { ClienteRepository } from "../ports/cliente.repository";

@Injectable()
export class ListarClientesUseCase {
  constructor(private readonly repository: ClienteRepository) {}

  async ejecutar(): Promise<Cliente[]> {
    return this.repository.listar();
  }
}
