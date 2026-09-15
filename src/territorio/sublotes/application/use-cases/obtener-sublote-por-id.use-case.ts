import { Injectable } from "@nestjs/common";
import { SubloteRepositoryPort } from "../ports/sublote.repository.port";
import { Sublote } from "../../domain/entities/sublote.dto";

@Injectable()
export class ObtenerSublotePorIdUseCase {
  constructor(private readonly subloteRepository: SubloteRepositoryPort) {}

  async execute(id: number): Promise<Sublote | null> {
    return await this.subloteRepository.findById(id);
  }
}
