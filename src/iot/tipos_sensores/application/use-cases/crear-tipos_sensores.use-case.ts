import { Injectable } from "@nestjs/common";
import { TiposSensoresRepositoryPort } from "../ports/tipos_sensores.repository.port";
import { CrearTipoSensoresDto } from "../dto/crear-tipos_sensores.dto";
import { TiposSensores } from "../../domain/entities/tipos_sensores.dto";

@Injectable()
export class CrearTiposSensoresUseCase {
  constructor(
    private readonly tiposSensoresRepository: TiposSensoresRepositoryPort,
  ) {}

  async execute(dto: CrearTipoSensoresDto): Promise<TiposSensores> {
    const nuevoTipoSensor = Object.assign(new TiposSensores(), dto);

    return await this.tiposSensoresRepository.crear(nuevoTipoSensor);
  }
}
