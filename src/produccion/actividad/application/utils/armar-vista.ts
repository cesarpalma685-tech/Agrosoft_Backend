import { Actividad } from "../../domain/entities/actividad.entity";
import { ResponsableConNombre } from "../../../../actividades_detalles/actividades_responsable/application/ports/actividad-responsable.repository.port";
import { HistorialConNombre } from "../../../../actividades_detalles/actividades_historial/application/ports/actividad-historial.repository.port";
import { ActividadInsumoReserva } from "../../../../actividades_detalles/actividades_insumos_reversa/domain/entities/actividad-insumo-reserva.entity";
import { ActividadHerramienta } from "../../../../actividades_detalles/actividades_herramientas/domain/entities/actividad-herramienta.entity";
import { ActividadInsumoUso } from "../../../../actividades_detalles/actividades_insumos_uso/domain/entities/actividad-insumo-uso.entity";
import { UsoHerramienta } from "../../../../actividades_detalles/usos_herramientas/domain/entities/uso-herramienta.entity";
import { ActividadServicio } from "../../../../actividades_detalles/actividades_servicios/domain/entities/actividad-servicio.entity";

export interface DetallesActividad {
  responsables: ResponsableConNombre[];
  historial: HistorialConNombre[];
  reservasInsumos: ActividadInsumoReserva[];
  herramientas: ActividadHerramienta[];
  usosInsumos: ActividadInsumoUso[];
  usosHerramientas: UsoHerramienta[];
  servicios: ActividadServicio[];
}

// Las evidencias (con imágenes) no viajan aquí: se piden aparte al abrir la pestaña.
export function armarVista(actividad: Actividad, detalles: DetallesActividad) {
  const propios = detalles.responsables
    .filter((r) => r.actividadId === actividad.id)
    .map((r) => ({
      usuarioId: r.usuarioId,
      nombre: r.nombre,
      horas: r.horas,
      precioHora: r.precioHora,
      costo: r.costo,
    }));
  const usosInsumos = detalles.usosInsumos
    .filter((u) => u.actividadId === actividad.id)
    .map((u) => ({ insumoId: u.insumoId, cantidad: u.cantidadUso, costo: u.costoTotal }));
  const usosHerramientas = detalles.usosHerramientas
    .filter((u) => u.actividadId === actividad.id)
    .map((u) => ({
      insumoId: u.insumoId,
      horas: u.horasUsadas,
      depreciacion: u.depreciacionGenerada,
      valorLibrosAntes: u.valorEnLibrosAntes,
      valorLibrosDespues: u.valorEnLibrosDespues,
    }));
  const servicios = detalles.servicios
    .filter((s) => s.actividadId === actividad.id)
    .map((s) => ({
      id: s.id,
      nombre: s.nombreServicio,
      maquinariaId: s.maquinariaId ?? null,
      horas: s.horas,
      precioHora: s.precioHora,
      costo: s.costo,
    }));
  const historial = detalles.historial
    .filter((h) => h.actividadId === actividad.id)
    .map((h) => ({
      id: h.id,
      fecha: h.createdAt,
      usuario: h.usuarioNombre,
      motivo: h.motivo ?? null,
      cambios: h.cambios ?? {},
    }));

  const manoObra = propios.reduce((suma, r) => suma + r.costo, 0);
  const insumos = usosInsumos.reduce((suma, u) => suma + u.costo, 0);
  const depreciacion = usosHerramientas.reduce((suma, u) => suma + u.depreciacion, 0);
  const costoServicios = servicios.reduce((suma, s) => suma + s.costo, 0);

  return {
    ...actividad,
    responsables: propios,
    reservasInsumos: detalles.reservasInsumos
      .filter((r) => r.actividadId === actividad.id)
      .map((r) => ({ insumoId: r.insumoId, cantidad: r.cantidadReservada })),
    herramientas: detalles.herramientas
      .filter((h) => h.actividadId === actividad.id)
      .map((h) => ({ insumoId: h.activoFijoId, horasEstimadas: h.horasEstimadas })),
    usosInsumos,
    usosHerramientas,
    servicios,
    historial,
    costos: {
      manoObra,
      insumos,
      servicios: costoServicios,
      depreciacion,
      total: manoObra + insumos + costoServicios + depreciacion,
    },
    ultimoMotivo: historial[0]?.motivo ?? null,
  };
}
