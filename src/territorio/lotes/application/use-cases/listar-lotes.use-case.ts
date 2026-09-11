import { Injectable } from "@nestjs/common";
import { LoteRepositoryPort } from "../ports/lote.repository.port";
import { LoteDto } from "../../domain/entities/lote.dto";

@Injectable()
export class ListarLotesUseCase {
  constructor(private readonly loteRepository: LoteRepositoryPort) {}

  async execute(): Promise<LoteDto[]> {
    return await this.loteRepository.findAll();
  }
}
