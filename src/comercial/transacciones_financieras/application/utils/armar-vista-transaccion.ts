import { TransaccionFinanciera } from "../../domain/entities/transaccion-financiera.entity";

export function armarVistaTransaccion(t: TransaccionFinanciera & { usuarioNombre: string }) {
  return {
    id: t.id,
    fecha: t.fecha,
    tipo: t.tipo,
    categoria: t.categoria,
    descripcion: t.descripcion ?? "",
    monto: t.monto,
    origen: t.origen,
    referencia: t.referencia ?? null,
    usuario: t.usuarioNombre,
    actividadId: t.actividadId ?? null,
    insumoId: t.insumoId ?? null,
    ventaId: t.ventaId ?? null,
  };
}
