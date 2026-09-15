import { Injectable } from "@nestjs/common";
import { VentaRepositoryPort } from "../ports/venta.repository.ports";
import { Venta } from "../../domain/entities/crear-venta.entity";

@Injectable()
export class ListarVentasUseCase {
  constructor(private readonly ventaRepository: VentaRepositoryPort) {}

  async execute(): Promise<Venta[]> {
    return await this.ventaRepository.findAll();
  }
}
