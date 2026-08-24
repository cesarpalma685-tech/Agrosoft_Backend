import { Factura } from '../../domain/entities/factura.entity';

export abstract class FacturaRepositoryPort {
    abstract save(factura: Factura): Promise<Factura>;
    abstract findById(id: number): Promise<Factura | null>;
    abstract findAll(): Promise<Factura[]>;
    abstract findByVentaId(ventaId: number): Promise<Factura[]>;
    abstract update(id: number, factura: Partial<Factura>): Promise<Factura>;
    abstract softDelete(id: number): Promise<void>;
}