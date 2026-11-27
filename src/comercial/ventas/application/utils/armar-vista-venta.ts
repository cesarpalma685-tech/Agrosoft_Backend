import { VentaConRelaciones } from "../ports/venta.repository.ports";
import { codigoPublicoFactura } from "./codigo-publico-factura";

const redondear = (valor: number) => Math.round((valor + Number.EPSILON) * 100) / 100;

export function armarVistaVenta(v: VentaConRelaciones) {
  const pagos = (v.pagos ?? []).map((p) => ({
    id: p.id,
    fecha: p.createdAt,
    metodo: p.metodo,
    monto: p.monto,
    moneda: p.moneda,
    referencia: p.referencia ?? null,
  }));
  const detalles = (v.detalles ?? []).map((d) => ({
    id: d.id,
    loteProduccionId: d.loteProduccionId ?? null,
    cultivoId: d.cultivoId ?? null,
    producto: d.productoagro?.nombre ?? "Producto",
    cantidadKg: d.cantidadKg,
    precioUnitarioKg: d.precioUnitarioKg,
    precioTotal: d.precioTotal,
    costoUnitarioKg: d.costoUnitarioKg,
    costoTotal: d.costoTotal,
  }));
  const pagado = redondear(pagos.reduce((s, p) => s + p.monto, 0));
  const costo = redondear(detalles.reduce((s, d) => s + d.costoTotal, 0));

  return {
    id: v.id,
    fecha: v.fecha,
    clienteId: v.clienteId,
    cliente: v.cliente?.nombre ?? "",
    vendedor: v.usuario ? `${v.usuario.nombre} ${v.usuario.apellido}`.trim() : "",
    subtotal: v.subtotal,
    descuento: v.descuento,
    impuestos: v.impuestos,
    total: v.total,
    estado: v.estado,
    pagado,
    saldo: Math.max(0, redondear(v.total - pagado)),
    costo,
    utilidad: redondear(v.total - costo),
    detalles,
    pagos,
    factura: v.factura
      ? { numero: v.factura.numero, prefijo: v.factura.prefijo ?? null, fechaEmision: v.factura.fechaEmision, vencimiento: v.factura.vencimiento, codigoPublico: codigoPublicoFactura(v.id) }
      : null,
    anulacion: v.estado === "anulada"
      ? { motivo: v.motivoAnulacion ?? "", fecha: v.fechaAnulacion ?? null, usuarioId: v.anuladaPorUsuarioId ?? null }
      : null,
  };
}
