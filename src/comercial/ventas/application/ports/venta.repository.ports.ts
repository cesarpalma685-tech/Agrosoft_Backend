import { Venta } from "../../domain/entities/crear-venta.entity";

export type VentaConRelaciones = Venta & {
  cliente?: { id: number; nombre: string; tipoIdentificacion?: string | null; identificacion?: string | null; direccion?: string | null };
  usuario?: { nombre: string; apellido: string };
  detalles?: {
    id: number;
    loteProduccionId?: number | null;
    cultivoId?: number | null;
    cantidadKg: number;
    precioUnitarioKg: number;
    precioTotal: number;
    costoUnitarioKg: number;
    costoTotal: number;
    productoagro?: { nombre: string };
  }[];
  pagos?: { id: number; metodo: string; monto: number; moneda: string; referencia?: string | null; createdAt: Date }[];
  factura?: { numero: string; prefijo?: string | null; fechaEmision: Date; vencimiento: Date } | null;
};

export abstract class VentaRepositoryPort {
  abstract save(venta: Venta): Promise<Venta>;
  abstract findById(id: number): Promise<Venta | null>;
  abstract findAll(): Promise<Venta[]>;
  abstract update(id: number, venta: Partial<Venta>): Promise<Venta>;
  abstract softDelete(id: number): Promise<void>;
  // Ventas con cliente, vendedor, detalles, pagos y factura para armar la vista
  abstract findAllConRelaciones(): Promise<VentaConRelaciones[]>;
  abstract findByIdConRelaciones(id: number): Promise<VentaConRelaciones | null>;
}
