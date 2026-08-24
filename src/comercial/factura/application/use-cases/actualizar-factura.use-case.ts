import { Injectable, NotFoundException } from '@nestjs/common';
import { FacturaRepositoryPort } from '../ports/factura.repository.port';
import { Factura } from '../../domain/entities/factura.entity';
import { CrearFacturaDto } from '../dto/crear-factura.dto';

@Injectable()
export class ActualizarFacturaUseCase {
    constructor(
    private readonly repository: FacturaRepositoryPort,
    )  {}

    async execute(id: number, dto: Partial<CrearFacturaDto>): Promise<Factura> {
    const existe = await this.repository.findById(id);
    if (!existe) {
        throw new NotFoundException(`La factura con ID ${id} no existe`);
    }

    const payload: Partial<Factura> = { ...dto } as any;
    if (dto.fechaEmision) {
        payload.fechaEmision = new Date(dto.fechaEmision);
    }
    if (dto.vencimiento) {
        payload.vencimiento = new Date(dto.vencimiento);
    }

    return await this.repository.update(id, payload);
    }
}