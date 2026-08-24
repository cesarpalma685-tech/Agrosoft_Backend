import { Injectable } from '@nestjs/common';
import { FacturaRepositoryPort } from '../ports/factura.repository.port';
import { Factura } from '../../domain/entities/factura.entity';

@Injectable()
export class ListarFacturasUseCase {
    constructor(
    private readonly repository: FacturaRepositoryPort,
    ) {}

    async execute(){
    return await this.repository.findAll();
    }
}