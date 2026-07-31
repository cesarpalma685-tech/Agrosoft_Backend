import { Injectable } from '@nestjs/common';
import { PagoRepositoryPort } from '../ports/pago.repository.port';
import { Pago } from '../../domain/entities/pago.entity';

@Injectable()
export class ListarPagosUseCase {
  constructor(
    private readonly repository: PagoRepositoryPort,
  ) {}

  async execute(){
    return await this.repository.findAll();
  }
}