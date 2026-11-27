import { Injectable, NotFoundException } from "@nestjs/common";
import { VentaRepositoryPort } from "../ports/venta.repository.ports";
import { armarVistaVenta } from "../utils/armar-vista-venta";
import { ventaIdDeCodigo } from "../utils/codigo-publico-factura";

@Injectable()
export class ConsultarVentasUseCase {
  constructor(private readonly ventaRepository: VentaRepositoryPort) {}

  async listar() {
    return (await this.ventaRepository.findAllConRelaciones()).map(armarVistaVenta);
  }

  /**
   * Factura que se abre al escanear el QR. Solo lo que muestra la factura impresa:
   * sin costos, utilidad ni datos internos.
   */
  async facturaPublica(codigo: string) {
    const id = ventaIdDeCodigo(codigo);
    const venta = id !== null ? await this.ventaRepository.findByIdConRelaciones(id) : null;
    if (!venta || !venta.factura) throw new NotFoundException("La factura no existe o el código no es válido");
    const v = armarVistaVenta(venta);
    return {
      factura: v.factura,
      fecha: v.fecha,
      estado: v.estado,
      vendedor: v.vendedor,
      cliente: {
        nombre: v.cliente,
        tipoIdentificacion: venta.cliente?.tipoIdentificacion ?? null,
        identificacion: venta.cliente?.identificacion ?? null,
        direccion: venta.cliente?.direccion ?? null,
      },
      detalles: v.detalles.map((d) => ({
        producto: d.producto,
        cantidadKg: d.cantidadKg,
        precioUnitarioKg: d.precioUnitarioKg,
        precioTotal: d.precioTotal,
      })),
      subtotal: v.subtotal,
      descuento: v.descuento,
      impuestos: v.impuestos,
      total: v.total,
      pagado: v.pagado,
    };
  }

  async obtener(id: number) {
    const venta = await this.ventaRepository.findByIdConRelaciones(id);
    if (!venta) throw new NotFoundException(`La venta con ID ${id} no existe`);
    return armarVistaVenta(venta);
  }
}
