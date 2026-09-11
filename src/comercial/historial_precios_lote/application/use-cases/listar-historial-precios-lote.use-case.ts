import { Injectable } from "@nestjs/common";
import { HistorialPrecioLoteRepositoryPort } from "../ports/historial-precio-lote.repository.port";
import { HistorialPrecioLote } from "../../domain/entities/historial-precio-lote.entity";

@Injectable()
export class ListarHistorialPreciosLoteUseCase {
  constructor(private readonly repository: HistorialPrecioLoteRepositoryPort) {}

  async execute() {
    return await this.repository.findAll();
  }
}
