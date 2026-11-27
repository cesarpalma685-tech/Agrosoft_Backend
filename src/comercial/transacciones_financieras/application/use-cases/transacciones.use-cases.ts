import { Injectable } from "@nestjs/common";
import { TransaccionFinancieraRepositoryPort } from "../ports/crear-transaccion-financiera.repository.port";
import { CrearTransaccionFinancieraDto } from "../dto/crear-transaccion-financiera.dto";
import { TransaccionFinanciera } from "../../domain/entities/transaccion-financiera.entity";
import { armarVistaTransaccion } from "../utils/armar-vista-transaccion";

@Injectable()
export class ListarTransaccionesUseCase {
  constructor(private readonly repository: TransaccionFinancieraRepositoryPort) {}

  async execute() {
    return (await this.repository.findAllConUsuario()).map(armarVistaTransaccion);
  }
}

@Injectable()
export class RegistrarTransaccionManualUseCase {
  constructor(private readonly repository: TransaccionFinancieraRepositoryPort) {}

  async execute(dto: CrearTransaccionFinancieraDto, usuarioId: number) {
    const nueva = new TransaccionFinanciera();
    Object.assign(nueva, {
      ...Object.fromEntries(Object.entries(dto).filter(([, v]) => v !== undefined)),
      fecha: new Date(dto.fecha),
      origen: "manual",
      usuarioId,
    });
    const guardada = await this.repository.save(nueva);
    const todas = await this.repository.findAllConUsuario();
    return armarVistaTransaccion(todas.find((t) => t.id === guardada.id)!);
  }
}
