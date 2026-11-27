import { Injectable } from "@nestjs/common";
import { TransaccionFinancieraRepositoryPort } from "../ports/crear-transaccion-financiera.repository.port";
import { TransaccionFinanciera } from "../../domain/entities/transaccion-financiera.entity";
import { VentaRepositoryPort } from "../../../ventas/application/ports/venta.repository.ports";
import { MovimientoInsumoRepositoryPort } from "../../../../inventario/movimientos_isumos/application/ports/crear-movimiento-insumo.repository.port";
import { TipoMovimientoInsumoEnum } from "../../../../inventario/movimientos_isumos/domain/enum/tipo-movimiento-insumo.enum";
import { InsumoRepositoryPort } from "../../../../inventario/insumos/application/ports/insumo.repository.port";
import { TipoInsumoEnum } from "../../../../inventario/insumos/domain/enums/tipo-insumo.enum";
import { ActividadRepositoryPort } from "../../../../produccion/actividad/application/ports/actividad.repository.port";

interface Deseada {
  origen: "venta" | "compra" | "actividad";
  referencia: string;
  tipo: "ingreso" | "egreso";
  categoria: string;
  monto: number;
  fecha: Date;
  descripcion: string;
  usuarioId: number;
  ventaId?: number;
  insumoId?: number;
  actividadId?: number;
}

const redondear = (v: number) => Math.round((v + Number.EPSILON) * 100) / 100;
const esHerramienta = (tipo: TipoInsumoEnum) => tipo === TipoInsumoEnum.HERRAMIENTA || tipo === TipoInsumoEnum.MAQUINARIA;

/**
 * Genera las transacciones que salen de otros módulos (RF9.2): ingresos por ventas, egresos por compras de
 * insumos y herramientas, y egresos por la mano de obra de las actividades. Se puede repetir sin duplicar:
 * cada una se identifica por su origen y su documento de referencia, y se corrige si el monto cambió.
 * Los insumos que una actividad consume no se cuentan otra vez: ya se pagaron al comprarlos.
 */
@Injectable()
export class GenerarTransaccionesUseCase {
  constructor(
    private readonly repository: TransaccionFinancieraRepositoryPort,
    private readonly ventas: VentaRepositoryPort,
    private readonly movimientos: MovimientoInsumoRepositoryPort,
    private readonly insumos: InsumoRepositoryPort,
    private readonly actividades: ActividadRepositoryPort,
  ) {}

  async execute(usuarioId: number) {
    const deseadas = new Map<string, Deseada>();
    const sumar = (d: Deseada) => deseadas.set(`${d.origen}|${d.referencia}`, d);

    const listaInsumos = await this.insumos.findAll();
    const insumoPorId = new Map(listaInsumos.map((i) => [i.id, i]));

    // 1) Ventas (las anuladas no generan ingreso)
    const ventas = await this.ventas.findAllConRelaciones();
    for (const v of ventas) {
      if (v.estado === "anulada") continue;
      const ref = `${v.factura?.prefijo ?? "AGS"}-${v.factura?.numero ?? String(v.id).padStart(6, "0")}`;
      sumar({
        origen: "venta", referencia: ref, tipo: "ingreso", categoria: "Venta de cosecha", monto: redondear(v.total),
        fecha: new Date(v.fecha), descripcion: `Venta ${ref} · ${v.cliente?.nombre ?? ""}`.trim(), usuarioId: v.usuarioId, ventaId: v.id,
      });
    }

    // 2) Compras: lote inicial de cada insumo/herramienta y entradas de inventario
    for (const i of listaInsumos) {
      const costo = Number(i.costoAdquisicion);
      if (costo <= 0) continue;
      sumar({
        origen: "compra", referencia: `INV-${i.id}`, tipo: "egreso", categoria: esHerramienta(i.tipoInsumo) ? "Compra de herramientas" : "Compra de insumos",
        monto: redondear(costo), fecha: new Date(i.fechaRegistro), descripcion: i.nombre, usuarioId: i.creadoPorUsuarioId, insumoId: i.id,
      });
    }
    for (const m of await this.movimientos.findAll()) {
      if (m.tipo !== TipoMovimientoInsumoEnum.ENTRADA || !m.costoTotal || m.costoTotal <= 0) continue;
      const insumo = insumoPorId.get(m.insumoId);
      sumar({
        origen: "compra", referencia: `MOV-${m.id}`, tipo: "egreso", categoria: insumo && esHerramienta(insumo.tipoInsumo) ? "Compra de herramientas" : "Compra de insumos",
        monto: redondear(m.costoTotal), fecha: new Date(m.createdAt ?? new Date()),
        descripcion: `${insumo?.nombre ?? "Insumo"} · ${m.cantidadPresentacion} ${insumo?.presentacionTipo?.toLowerCase() ?? "und"}`,
        usuarioId: m.usuarioId ?? usuarioId, insumoId: m.insumoId,
      });
    }

    // 3) Actividades: mano de obra
    for (const a of await this.actividades.findAll()) {
      const costo = Number(a.costoManoObra ?? 0);
      if (costo <= 0) continue;
      sumar({
        origen: "actividad", referencia: `ACT-${String(a.id).padStart(6, "0")}`, tipo: "egreso",
        categoria: /fitosan/i.test(`${a.tipo} ${a.subtipo ?? ""}`) ? "Control fitosanitario" : "Mano de obra y labores",
        monto: redondear(costo), fecha: new Date(a.fecha), descripcion: a.nombre, usuarioId: a.creadoPorUsuarioId ?? usuarioId, actividadId: a.id,
      });
    }

    // Se comparan con las automáticas que ya existen
    const existentes = (await this.repository.findAll()).filter((t) => t.origen !== "manual" && t.referencia);
    const porClave = new Map(existentes.map((t) => [`${t.origen}|${t.referencia}`, t]));
    let creadas = 0;
    let actualizadas = 0;
    let eliminadas = 0;

    for (const [clave, d] of deseadas) {
      const actual = porClave.get(clave);
      if (!actual) {
        const nueva = new TransaccionFinanciera();
        Object.assign(nueva, { ...d, descripcion: d.descripcion });
        await this.repository.save(nueva);
        creadas++;
      } else if (Number(actual.monto) !== d.monto || actual.categoria !== d.categoria) {
        await this.repository.update(actual.id, { monto: d.monto, categoria: d.categoria, descripcion: d.descripcion });
        actualizadas++;
      }
    }
    // Las que ya no corresponden (venta anulada, actividad sin costo…) se retiran
    for (const [clave, actual] of porClave) {
      if (!deseadas.has(clave)) {
        await this.repository.softDelete(actual.id);
        eliminadas++;
      }
    }
    return { creadas, actualizadas, eliminadas };
  }
}
