import { VentaDetalle } from "../../domain/entities/venta-detalle.entity";

export abstract class VentaDetalleRepositoryPort {
  abstract save(ventaDetalle: VentaDetalle): Promise<VentaDetalle>;
  abstract findById(id: number): Promise<VentaDetalle | null>;
  abstract findAll(): Promise<VentaDetalle[]>;
  abstract findByVentaId(ventaId: number): Promise<VentaDetalle[]>;
  abstract update(
    id: number,
    ventaDetalle: Partial<VentaDetalle>,
  ): Promise<VentaDetalle>;
  abstract softDelete(id: number): Promise<void>;
}
