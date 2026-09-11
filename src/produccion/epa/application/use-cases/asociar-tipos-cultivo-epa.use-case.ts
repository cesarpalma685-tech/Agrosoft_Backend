import { Injectable } from "@nestjs/common";
import { EpaRepositoryPort } from "../ports/epa.repository.port";

@Injectable()
export class AsociarTiposCultivoEpaUseCase {
  constructor(private readonly epaRepository: EpaRepositoryPort) {}

  async execute(epaId: number, tipoCultivoWikiIds: number[]): Promise<void> {
    await this.epaRepository.asociarTiposCultivo(epaId, tipoCultivoWikiIds);
  }
}
