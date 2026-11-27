import { Injectable } from "@nestjs/common";
import { InsumoRepositoryPort } from "../ports/insumo.repository.port";
import { CrearInsumoDto } from "../dto/crear-insumo.dto";
import { Insumo } from "../../domain/entities/crear-insumo.dto";
import { EstadoInsumoEnum } from "../../domain/enums/estado-insumo.enum";
import { calcularDerivados } from "../utils/calcular-derivados";

// El DTO transformado trae las propiedades omitidas como undefined: no deben pisar los valores por defecto.
const sinUndefined = <T extends object>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

@Injectable()
export class CrearInsumoUseCase {
  constructor(private readonly insumoRepository: InsumoRepositoryPort) {}

  async execute(dto: CrearInsumoDto, creadoPorUsuarioId: number): Promise<Insumo> {
    const nuevo = new Insumo();
    Object.assign(nuevo, {
      descripcion: "",
      presentacionTipo: "Unidad",
      presentacionCantidad: 1,
      presentacionUnidad: "und",
      unidadUso: "und",
      tipoMateria: "No aplica",
      factorConversionUso: 1,
      stockPresentacion: 0,
      stockReservado: 0,
      stockMinimo: 0,
      precioUnitarioPresentacion: 0,
      costoAdquisicion: 0,
      valorResidual: 0,
      vidaUtilHoras: 0,
      horasUsadas: 0,
      depreciacionAcumulada: 0,
      estado: EstadoInsumoEnum.ACTIVO,
      ...sinUndefined(dto),
      creadoPorUsuarioId,
      fechaRegistro: new Date(),
    });
    Object.assign(nuevo, calcularDerivados(nuevo));

    return await this.insumoRepository.save(nuevo);
  }
}
